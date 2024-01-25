import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import styles from '../styles/modal.module.css';
import MenuItemFormPage from './MenuItemForm';
import CloseButton from '/public/icons/close.svg';

const MenuItemModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { isEdit } = useMenuItemStore();

  const clickItemModalHide = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['menu-modal-wrap']}>
      {isEdit ? <h3 className={styles['title']}>메뉴 수정</h3> : <h3 className={styles['title']}>메뉴 등록</h3>}

      <div className={styles['close-button']}>
        <CloseButton width={26} height={26} onClick={clickItemModalHide} />
      </div>
      <div className={styles['line']}></div>
      <div className={styles['box']}>
        <MenuItemFormPage clickItemModalHide={clickItemModalHide} />
      </div>
    </div>
  );
};

export default MenuItemModal;
