import styles from '@/components/menu-category/styles/form.module.css';
import { MENU_CONFIRM } from '@/hooks/service/menu/useText';

interface MenuCategoryModal {
  clickCategoryModalHide: () => void;
}

const AddCategoryComponent: React.FC<MenuCategoryModal> = props => {
  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['delete-btn']} type="button" onClick={props.clickCategoryModalHide}>
        {MENU_CONFIRM.CANCEL}
      </button>
      <button className={styles['update-btn']} type="submit">
        {MENU_CONFIRM.CHECK}
      </button>
    </div>
  );
};

export default AddCategoryComponent;
