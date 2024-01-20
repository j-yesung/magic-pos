import useSetMenuItem from '@/hooks/menu/menu-item/useSetMenuItems';
import useMenuItemStore from '@/shared/store/menu-item';
import useSideFormState from '@/shared/store/side-form';
import styles from '../styles/menu-item-form.module.css';

const MenuItemFormButton = () => {
  const { setIsSideFormOpen } = useSideFormState();
  const { deleteMutate } = useSetMenuItem();
  const { isEdit, menuItem } = useMenuItemStore();

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    deleteMutate(menuItem.id);
    setIsSideFormOpen(false);
  };

  return (
    <>
      {isEdit ? (
        <div className={styles['btn-wrap']}>
          <button className={styles['update-btn']} type="submit">
            수정
          </button>
          <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
            삭제
          </button>
        </div>
      ) : (
        <div className={styles['btn-wrap']}>
          <button className={styles['update-btn']} type="submit">
            추가
          </button>
        </div>
      )}
    </>
  );
};

export default MenuItemFormButton;
