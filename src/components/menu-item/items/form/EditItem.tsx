import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import { MENU_CONFIRM, MENU_TOAST } from '@/data/menu-item';
import useSetMenuItem from '@/hooks/query/menu/menu-item/useSetMenuItems';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import dayjs from 'dayjs';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

interface MenuItemModal {
  clickItemModalHide: () => void;
  updatePending: boolean;
  uploadImagePending: boolean;
}

const EditItemButtonComponent = ({ clickItemModalHide, updatePending, uploadImagePending }: MenuItemModal) => {
  const { MagicModal } = useModal();
  const { showCompleteToast } = useMenuToast();
  const { deleteMutate, deletePending, removeImageMutate } = useSetMenuItem();
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);
  const menuItemImgFile = useMenuItemStore(state => state.menuItemImgFile);

  // 메뉴 삭제
  const clickRemoveCategoryHandler = () => {
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: MENU_TOAST.ITEM_REMOVE_ALERT,
      confirmButtonCallback: async () => {
        await deleteMutate(menuItem.id);
        if (menuItemSampleImg !== '') {
          const uploadImageGroup = {
            menuId: menuItem.id,
            categoryId: menuItem.category_id,
            createAt: dayjs().toISOString(),
            selectedFile: menuItemImgFile!,
          };
          removeImageMutate(uploadImageGroup);
        }
        if (!deletePending) {
          showCompleteToast(MENU_TOAST.ITEM_REMOVE, 'success');
          clickItemModalHide();
        }
      },
    });
  };
  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
        {deletePending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : MENU_CONFIRM.ITEM_REMOVE}
      </button>
      <button className={styles['update-btn']} type="submit">
        {updatePending || uploadImagePending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : MENU_CONFIRM.ITEM_EDIT}
      </button>
    </div>
  );
};

export default EditItemButtonComponent;
