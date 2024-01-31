import styles from '@/components/menu-item/styles/modal.module.css';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import MenuItemFormPage from '../form/FormItem';
import CloseButton from '/public/icons/close.svg';

const MenuItemModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { isEdit } = useMenuItemStore();

  const clickItemModalHide = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['menu-modal-wrap']}>
      <div className={styles['menu-modal-top']}>
        {isEdit ? <h3 className={styles['title']}>메뉴 수정</h3> : <h3 className={styles['title']}>메뉴 등록</h3>}

        <div className={styles['close-button']}>
          <CloseButton width={26} height={26} onClick={clickItemModalHide} />
        </div>
      </div>
      <div className={styles['line']}></div>
      <div className={styles['box']}>
        <MenuItemFormPage clickItemModalHide={clickItemModalHide} />
      </div>
    </div>
  );
};

export default MenuItemModal;
