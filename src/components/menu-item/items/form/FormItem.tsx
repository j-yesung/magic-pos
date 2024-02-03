import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import useSetMenuItem from '@/hooks/query/menu/menu-item/useSetMenuItems';
import useSetMenuOption from '@/hooks/query/menu/menu-item/useSetMenuOption';
import useSetMenuOptionDetail from '@/hooks/query/menu/menu-item/useSetMenuOptionDetail';
import useToast from '@/hooks/service/ui/useToast';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import useMenuOptionStore, {
  NewMenuOptionWithDetail,
  NewOptionDetailType,
  setChangeMenuOptions,
  setMenuOptions,
} from '@/shared/store/menu/menu-option';
import { Tables, TablesInsert } from '@/types/supabase';
import dayjs from 'dayjs';
import { useRef } from 'react';
import MenuItemFormInput from './InputItem';
import MenuItemFormButton from './RemoveItem';

interface MenuItemModal {
  clickItemModalHide: () => void;
}

const MenuItemFormPage: React.FC<MenuItemModal> = props => {
  const { toast } = useToast();
  const {
    addMutate,
    addPending,
    updateNameMutate,
    updatePending,
    uploadImageMutate,
    uploadImagePending,
    removeImageMutate,
  } = useSetMenuItem();
  const { addOptionMutate, updateOptionMutate, removeOptionMutate } = useSetMenuOption();
  const { addUpsertOptionDetailMutate } = useSetMenuOptionDetail();

  const isEdit = useMenuItemStore(state => state.isEdit);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);
  const menuItemImgFile = useMenuItemStore(state => state.menuItemImgFile);

  const menuOptions = useMenuOptionStore(state => state.menuOptions);
  const origineMenuOptions = useMenuOptionStore(state => state.origineMenuOptions);
  const changeMenuOptions = useMenuOptionStore(state => state.changeMenuOptions);

  const menuItemRef = useRef<TablesInsert<'menu_item'> & { id?: string }>(null!);

  // 메뉴 등록 form
  const submitupdateMenuItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      menuItemRef.current = {
        category_id: menuItem.category_id,
        name: menuItem.name,
        position: menuItem.position,
        price: menuItem.price!,
        recommended: menuItem.recommended,
        remain_ea: menuItem.remain_ea,
        image_url: menuItem.image_url,
      };

      // 메뉴 추가 or 수정
      !isEdit
        ? await addMenuItemHandler(menuItemRef.current)
        : (menuItemRef.current = { ...menuItemRef.current, id: menuItem.id });

      await uploadMenuItemImageHandler(); // 사진 업로드
      await updateNameMutate(menuItemRef.current); // 업데이트
      removerOptionHandler(); // 옵션 업데이트 부분(삭제 필터링)
      filterOptionHandler(); // 옵션 업데이트 부분(비교 필터링)
      if (!addPending && !updatePending && !uploadImagePending) {
        toast(!isEdit ? '메뉴 등록 성공' : '메뉴 수정 성공', {
          type: 'success',
          position: 'top-center',
          showCloseButton: false,
          autoClose: 2000,
        });
        props.clickItemModalHide();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 메뉴 추가 handler
  const addMenuItemHandler = async (newMenuItemData: TablesInsert<'menu_item'>) => {
    const addData = await addMutate(newMenuItemData);
    menuItemRef.current = { ...menuItemRef.current, id: addData[0].id };
    if (menuOptions.length > 0) {
      const newMenuOptions = menuOptions.map(option => (option.menu_id = addData[0].id));
      setMenuOptions([...menuOptions, newMenuOptions] as NewMenuOptionWithDetail[]);
    }
  };

  // 이미지 업로드 handler
  const uploadMenuItemImageHandler = async () => {
    let uploadedMenuImage = '';
    const formattedDate = dayjs().toISOString();
    const uploadImageGroup = {
      menuId: menuItemRef.current.id!,
      categoryId: menuItem.category_id,
      createAt: formattedDate,
      selectedFile: menuItemImgFile!,
    };
    if (isEdit && menuItemSampleImg === '' && menuItemSampleImg !== menuItem.image_url) {
      removeImageMutate(uploadImageGroup);
      menuItemRef.current = { ...menuItemRef.current, image_url: null };
    }
    if (menuItemImgFile !== null) {
      uploadedMenuImage = await uploadImageMutate(uploadImageGroup);
      menuItemRef.current = { ...menuItemRef.current, image_url: uploadedMenuImage };
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
        const { data: optionData } = await addOptionMutate(newOption);

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
      <MenuItemFormButton
        clickItemModalHide={props.clickItemModalHide}
        addPending={addPending}
        updatePending={updatePending}
        uploadImagePending={uploadImagePending}
      />
    </form>
  );
};

export default MenuItemFormPage;
