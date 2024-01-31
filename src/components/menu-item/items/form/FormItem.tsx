import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import useSetMenuItem from '@/hooks/menu/menu-item/useSetMenuItems';
import useSetMenuOption from '@/hooks/menu/menu-item/useSetMenuOption';
import useSetMenuOptionDetail from '@/hooks/menu/menu-item/useSetMenuOptionDetail';
import useMenuItemStore, { setMenuItem, setMenuItemImgFile } from '@/shared/store/menu/menu-item';
import useMenuOptionStore, {
  NewMenuOptionWithDetail,
  NewOptionDetailType,
  setChangeMenuOptions,
  setMenuOptions,
} from '@/shared/store/menu/menu-option';
import { Tables, TablesInsert } from '@/types/supabase';
import moment from 'moment';
import MenuItemFormInput from './InputItem';
import MenuItemFormButton from './RemoveItem';

interface MenuItemModal {
  clickItemModalHide: () => void;
}

const MenuItemFormPage: React.FC<MenuItemModal> = props => {
  const { addMutate, updateNameMutate, uploadImageMutate, removeImageMutate } = useSetMenuItem();
  const { addOptionMutate, updateOptionMutate, removeOptionMutate } = useSetMenuOption();
  const { addUpsertOptionDetailMutate } = useSetMenuOptionDetail();

  const isEdit = useMenuItemStore(state => state.isEdit);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);
  const menuItemImgFile = useMenuItemStore(state => state.menuItemImgFile);

  const menuOptions = useMenuOptionStore(state => state.menuOptions);
  const origineMenuOptions = useMenuOptionStore(state => state.origineMenuOptions);
  const changeMenuOptions = useMenuOptionStore(state => state.changeMenuOptions);

  // 메뉴 추가 and 수정
  const submitupdateMenuItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newMenuItemData: TablesInsert<'menu_item'> | Tables<'menu_item'> = {
        category_id: menuItem.category_id,
        name: menuItem.name,
        position: menuItem.position,
        price: menuItem.price,
        recommended: menuItem.recommended,
        remain_ea: menuItem.remain_ea,
        image_url: menuItem.image_url,
      };
      if (!isEdit) {
        const addData = await addMutate.mutateAsync(newMenuItemData);
        setMenuItem(addData[0]);
        newMenuItemData.id = addData[0].id;
        const newMenuOptions = menuOptions.map(option => (option.menu_id = addData[0].id));
        setMenuOptions([...menuOptions, newMenuOptions] as NewMenuOptionWithDetail[]);
      } else {
        newMenuItemData.id = menuItem.id;
      }

      let uploadedMenuImage = '';
      const formattedDate = moment().toISOString();
      const uploadImageGroup = {
        menuId: newMenuItemData.id,
        categoryId: menuItem.category_id,
        createAt: formattedDate,
        selectedFile: menuItemImgFile!,
      };
      // 이미지가 새로 업로드 됐다면
      if (menuItemImgFile !== null) {
        if (isEdit) removeImageMutate(uploadImageGroup);
        uploadedMenuImage = await uploadImageMutate.mutateAsync(uploadImageGroup);
        setMenuItem({ ...menuItem, image_url: uploadedMenuImage });
        newMenuItemData.image_url = uploadedMenuImage;
      } else if (menuItemSampleImg === '' && menuItemSampleImg !== menuItem.image_url) {
        setMenuItem({ ...menuItem, image_url: null });
        removeImageMutate(uploadImageGroup);
        newMenuItemData.image_url = null;
      }
      updateNameMutate(newMenuItemData);
      setMenuItemImgFile(null);

      // 옵션 업데이트 부분
      removerOptionHandler();
      filterOptionHandler();
      setMenuOptions([]);
      props.clickItemModalHide();
    } catch (error) {
      console.error(error);
    }
  };

  // 옵션 삭제시 필터링
  const removerOptionHandler = () => {
    const missingInMenuOptions = origineMenuOptions.filter(item =>
      menuOptions.some(menu => menu.menu_id === item.menu_id),
    );
    const missingItems = missingInMenuOptions.filter(item => !menuOptions.some(menu => menu.id === item.id));
    // 옵션이 전부 삭제 됐을 때 처리
    const missingInOrigineOptions = origineMenuOptions.filter(item => item.menu_id === menuItem.id);

    if (missingItems.length === 0 && menuOptions.length === 0 && missingInOrigineOptions.length !== 0) {
      missingInOrigineOptions.forEach(async item => {
        removeOptionMutate(item.id);
      });
    } else if (missingItems.length > 0) {
      missingItems.forEach(async item => {
        removeOptionMutate(item.id);
      });
    }
  };

  const filterOptionHandler = () => {
    const differences = findDifferences(menuOptions, origineMenuOptions);
    differences.map(async item => {
      if (item.id === '') {
        // 옵션 항목 supabase에 추가
        const newOption = {
          name: item.name,
          is_use: item.is_use,
          max_detail_count: item.max_detail_count,
          menu_id: item.menu_id,
        };
        const { data: optionData } = await addOptionMutate.mutateAsync(newOption);

        // 해당 data 받아서 그 option_id로 detail들 추가
        item.menu_option_detail.map(async option => {
          const addOptionForm: Omit<Tables<'menu_option_detail'>, 'id'> = {
            name: option.name,
            option_id: optionData[0].id,
            price: Number(option.price),
          };
          addUpsertOptionDetailMutate(addOptionForm);
        });
        const newOptionList: NewMenuOptionWithDetail = {
          id: optionData[0].id,
          name: optionData[0].name,
          is_use: optionData[0].is_use,
          max_detail_count: optionData[0].max_detail_count,
          menu_id: optionData[0].menu_id,
          menu_option_detail: item.menu_option_detail,
        };
        setChangeMenuOptions([...changeMenuOptions, { ...newOptionList }]);
      } else {
        // 옵션은 있는거니까 해당 detail을 옵션 아이디로 supabase 추가
        updateOptionMutate(item);
        const newOptionList: NewMenuOptionWithDetail = {
          id: item.id,
          name: item.name,
          is_use: item.is_use,
          max_detail_count: item.max_detail_count,
          menu_id: item.menu_id,
          menu_option_detail: [],
        };
        // 디테일 있는것도 있고 없는것도 있으니까 upsert
        item.menu_option_detail.map(async option => {
          const addOptionForm: Omit<Tables<'menu_option_detail'>, 'id'> | Tables<'menu_option_detail'> = {
            name: option.name,
            option_id: newOptionList.id,
            price: Number(option.price),
          };

          if (option.id !== '') (addOptionForm as Tables<'menu_option_detail'>).id = option.id;

          addUpsertOptionDetailMutate(addOptionForm);
        });
      }
    });
  };

  // 옵션 비교 함수
  const findDifferences = (optionNowArray: NewMenuOptionWithDetail[], optionOriginArray: NewMenuOptionWithDetail[]) => {
    const differentArray: NewMenuOptionWithDetail[] = [];

    optionNowArray.forEach(itemNum1 => {
      const itemNum2 = optionOriginArray.find(findItem => findItem.id === itemNum1.id);

      if (
        !itemNum2 ||
        itemNum1.is_use !== itemNum2.is_use ||
        itemNum1.name !== itemNum2.name ||
        itemNum1.max_detail_count !== itemNum2.max_detail_count ||
        !compareMenuOptions(itemNum1.menu_option_detail, itemNum2.menu_option_detail)
      ) {
        differentArray.push(itemNum1);
      }
    });

    return differentArray;
  };

  // 옵션 디테일 배열을 비교하는 함수
  const compareMenuOptions = (optionNowArray: NewOptionDetailType[], optionOriginArray: NewOptionDetailType[]) => {
    const newItems = [];

    optionNowArray.forEach(itemNum1 => {
      const itemNum2 = optionOriginArray.find(item => item.name === itemNum1.name);

      if (!itemNum2) {
        newItems.push(itemNum1);
      }
    });

    return newItems.length === 0; // 반환 값이 true이면 두 배열이 같다는 것을 의미
  };

  return (
    <form onSubmit={submitupdateMenuItemHandler} className={styles['wrap']}>
      <MenuItemFormInput />
      <MenuItemFormButton clickItemModalHide={props.clickItemModalHide} />
    </form>
  );
};

export default MenuItemFormPage;