import { useModal } from '@/hooks/service/ui/useModal';
import Body from './body/Body';
import ModalButton from './button/ModalButton';
import styles from './styles/confirmModal.module.css';
import CloseButton from '/public/icons/close.svg';
const ConfirmModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const clickHiddenModal = () => MagicModal.hide(modalId ?? '');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button type="button" onClick={clickHiddenModal}>
          <CloseButton width={26} height={26} />
        </button>
      </div>
      <Body />
      <ModalButton hiddenModal={clickHiddenModal} />
    </div>
  );
};

export default ConfirmModal;
