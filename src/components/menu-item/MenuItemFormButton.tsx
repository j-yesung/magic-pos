import { removeMenuItem } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormButton = () => {
  const { toggleShow, menuItem, setMenuItem, removeMenuItemStore } = useMenuItemStore();

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
    <>
      <div className={styles['btn-wrap']}>
        <button className={styles['update-btn']} type="submit">
          확인
        </button>
        <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
          삭제
        </button>
      </div>
      <button className={styles['x-wrap']} type="button" onClick={clickFormHideHandler}>
        X
      </button>
    </>
  );
};

export default MenuItemFormButton;
