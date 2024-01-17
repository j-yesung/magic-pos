import { removeMenuItem } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormButton = () => {
  const {
    isShow,
    toggleShow,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    updateMenuItemStore,
    removeMenuItemStore,
    menuItemImgFile,
    setMenuItemImgFile,
    menuItemSampleImg,
    setMenuItemSampleImg,
    menuOption,
    setMenuOption,
    menuOptions,
    setMenuOptions,
    origineMenuOptions,
    changeMenuOptions,
    setChangeMenuOptions,
    updateChangeMenuOptionsStore,
    removeChangeMenuOptionsStore,
    setMenuOptionDetailList,
    setMenuOptionIndex,
  } = useMenuItemStore();

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    removeMenuItemStore(menuItem);
    setMenuItem({ ...menuItem, id: '', name: '', price: 0, remain_ea: 0 });
    await removeMenuItem(menuItem.id);
    toggleShow(false);
  };

  // 입력창 숨기기
  const clickFormHideHandler = () => {
    toggleShow(false);
    setMenuItem({ ...menuItem, id: '' });
  };

  return (
    <><div className={styles['btn-wrap']}>
    <button className={styles['update-btn']} type="submit">
      수정 완료
    </button>
    <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
      메뉴 삭제
    </button>
  </div>
  <button className={styles['x-wrap']} type="button" onClick={clickFormHideHandler}>
    X
  </button></>
  )
}

export default MenuItemFormButton