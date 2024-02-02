import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import useSetMenuItem from '@/hooks/menu/menu-item/useSetMenuItems';
import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import dayjs from 'dayjs';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

interface MenuItemModal {
  clickItemModalHide: () => void;
  addPending: boolean;
  updatePending: boolean;
  uploadImagePending: boolean;
}
const MenuItemFormButton = ({ clickItemModalHide, addPending, updatePending, uploadImagePending }: MenuItemModal) => {
  const { MagicModal } = useModal();
  const { toast } = useToast();
  const { deleteMutate, deletePending, removeImageMutate } = useSetMenuItem();

  const isEdit = useMenuItemStore(state => state.isEdit);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);
  const menuItemImgFile = useMenuItemStore(state => state.menuItemImgFile);

  // 메뉴 삭제
  const clickRemoveCategoryHandler = () => {
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: '메뉴를 삭제할까요?',
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
          toast('메뉴 삭제 완료', {
            type: 'success',
            position: 'top-center',
            showCloseButton: false,
            autoClose: 2000,
          });
          clickItemModalHide();
        }
      },
    });
  };

  return (
    <div className={styles['wrap']}>
      {isEdit ? (
        <div className={styles['btn-wrap']}>
          <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
            {deletePending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : '메뉴 삭제'}
          </button>
          <button className={styles['update-btn']} type="submit">
            {updatePending || uploadImagePending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : '수정하기'}
          </button>
        </div>
      ) : (
        <div className={styles['btn-wrap']}>
          <button className={styles['basic-btn']} type="button" onClick={clickItemModalHide}>
            취소
          </button>
          <button className={styles['update-btn']} type="submit">
            {addPending || uploadImagePending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : '확인'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItemFormButton;
