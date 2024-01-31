import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import useSetMenuItem from '@/hooks/menu/menu-item/useSetMenuItems';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import moment from 'moment';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

interface MenuItemModal {
  clickItemModalHide: () => void;
}
const MenuItemFormButton: React.FC<MenuItemModal> = props => {
  const { MagicModal } = useModal();
  const { deleteMutate, removeImageMutate } = useSetMenuItem();

  const isEdit = useMenuItemStore(state => state.isEdit);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const sampleImage = useMenuItemStore(state => state.sampleImage);
  const menuItemSampleImg = useMenuItemStore(state => state.menuItemSampleImg);
  const menuItemImgFile = useMenuItemStore(state => state.menuItemImgFile);

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: '메뉴를 삭제할까요?',
      confirmButtonCallback: () => {
        deleteMutate(menuItem.id);
        if (menuItemSampleImg !== sampleImage) {
          const uploadImageGroup = {
            menuId: menuItem.id,
            categoryId: menuItem.category_id,
            createAt: moment().toISOString(),
            selectedFile: menuItemImgFile!,
          };
          removeImageMutate(uploadImageGroup);
        }
        props.clickItemModalHide();
      },
    });
  };

  return (
    <div className={styles['wrap']}>
      {isEdit ? (
        <div className={styles['btn-wrap']}>
          <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
            메뉴 삭제
          </button>
          <button className={styles['update-btn']} type="submit">
            수정하기
          </button>
        </div>
      ) : (
        <div className={styles['btn-wrap']}>
          <button className={styles['basic-btn']} type="button" onClick={props.clickItemModalHide}>
            취소
          </button>
          <button className={styles['update-btn']} type="submit">
            확인
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItemFormButton;
