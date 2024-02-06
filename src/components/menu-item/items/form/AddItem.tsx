import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import { MENU_CONFIRM } from '@/data/menu-item';

interface MenuItemModal {
  clickItemModalHide: () => void;
  addPending: boolean;
  uploadImagePending: boolean;
}

const AddItemButtonComponent = ({ clickItemModalHide, addPending, uploadImagePending }: MenuItemModal) => {
  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['basic-btn']} type="button" onClick={clickItemModalHide}>
        {MENU_CONFIRM.CANCEL}
      </button>
      <button className={styles['update-btn']} disabled={addPending || uploadImagePending} type="submit">
        {addPending || uploadImagePending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : MENU_CONFIRM.CHECK}
      </button>
    </div>
  );
};

export default AddItemButtonComponent;
