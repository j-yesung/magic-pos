import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import AddItemButtonComponent from './AddItem';
import EditItemButtonComponent from './EditItem';

interface MenuItemModal {
  clickItemModalHide: () => void;
  addPending: boolean;
  updatePending: boolean;
  uploadImagePending: boolean;
}
const MenuItemFormButton = ({ clickItemModalHide, addPending, updatePending, uploadImagePending }: MenuItemModal) => {
  const isEdit = useMenuItemStore(state => state.isEdit);

  return (
    <div className={styles['wrap']}>
      {isEdit ? (
        <EditItemButtonComponent
          clickItemModalHide={clickItemModalHide}
          updatePending={updatePending}
          uploadImagePending={uploadImagePending}
        />
      ) : (
        <AddItemButtonComponent
          clickItemModalHide={clickItemModalHide}
          addPending={addPending}
          uploadImagePending={uploadImagePending}
        />
      )}
    </div>
  );
};

export default MenuItemFormButton;
