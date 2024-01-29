import { useModal } from '@/hooks/service/ui/useModal';
import styles from '../styles/modal.module.css';
import MenuOptionModalButton from './MenuOptionModalButton';
import MenuOptionModalInput from './MenuOptionModalInput';
import CloseButton from '/public/icons/close.svg';

const MenuOptionModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();

  const clickItemModalHide = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['menu-option-modal-wrap']}>
      <div className={styles['menu-modal-top']}>
        <h3 className={styles['title']}>옵션 상세 설정</h3>

        <div className={styles['close-button']}>
          <CloseButton width={26} height={26} onClick={clickItemModalHide} />
        </div>
      </div>

      <div className={styles['line']}></div>
      <div className={styles['box']}>
        <MenuOptionModalInput />
        <MenuOptionModalButton modalId={modalId} />
      </div>
    </div>
  );
};

export default MenuOptionModal;
