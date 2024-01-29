import { useModal } from '@/hooks/service/ui/useModal';
import { CalendarDataType } from '@/types/sales';
import ModalBody from './body/ModalBody';
import ModalButton from './button/ModalButton';
import ModalHeader from './header/ModalHeader';
import styles from './styles/salesModal.module.css';
const SalesModal = ({ specificData, modalId }: { specificData: CalendarDataType; modalId?: string }) => {
  const { MagicModal } = useModal();
  const clickCloseModal = () => {
    MagicModal.hide(modalId ?? '');
  };
  return (
    <div className={styles.container}>
      <ModalHeader clickCloseModal={clickCloseModal} />
      <ModalBody sales={specificData} />
      <ModalButton clickCloseModal={clickCloseModal} />
    </div>
  );
};

export default SalesModal;
