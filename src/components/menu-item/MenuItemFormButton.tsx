import { removeMenuItem } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import useSideFormState from '@/shared/store/side-form';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormButton = () => {
  const { setIsSideFormOpen } = useSideFormState();
  const { menuItem, setMenuItem, removeMenuItemStore } = useMenuItemStore();

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    removeMenuItemStore(menuItem);
    setMenuItem({ ...menuItem, id: '', name: '', price: 0, remain_ea: 0 });
    await removeMenuItem(menuItem.id);
    setIsSideFormOpen(false);
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
    </>
  );
};

export default MenuItemFormButton;
