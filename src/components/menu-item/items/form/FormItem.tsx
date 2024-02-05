import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import { MENU_TOAST } from '@/data/menu-item';
import useSetMenuItem from '@/hooks/query/menu/menu-item/useSetMenuItems';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import useOptionFiltering from '@/hooks/service/menu/useOptionFiltering';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import useMenuOptionStore, { NewMenuOptionWithDetail, setMenuOptions } from '@/shared/store/menu/menu-option';
import { TablesInsert } from '@/types/supabase';
import dayjs from 'dayjs';
import { useRef } from 'react';
import MenuItemFormButton from './ButtonWrapItem';
import MenuItemFormInput from './InputItem';

interface MenuItemModal {
  clickItemModalHide: () => void;
}

const MenuItemFormPage: React.FC<MenuItemModal> = props => {
  const { showCompleteToast } = useMenuToast();
  const {
    addMutate,
    addPending,
    updateNameMutate,
    updatePending,
    uploadImageMutate,
    uploadImagePending,
    removeImageMutate,
  } = useSetMenuItem();

  const isEdit = useMenuItemStore(state => state.isEdit);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);
  const menuItemImgFile = useMenuItemStore(state => state.menuItemImgFile);
  const menuOptions = useMenuOptionStore(state => state.menuOptions);
  const menuItemRef = useRef<TablesInsert<'menu_item'> & { id?: string }>(null!);

  const { filterOptionHandler, removerOptionHandler } = useOptionFiltering();

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
        showCompleteToast(!isEdit ? MENU_TOAST.ITEM_ADD : MENU_TOAST.ITEM_EDIT, 'success');
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
