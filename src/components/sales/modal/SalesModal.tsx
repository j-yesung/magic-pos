import { CalendarDataType } from '@/types/sales';
import ModalBody from './body/ModalBody';
import ModalButton from './button/ModalButton';
import ModalHeader from './header/ModalHeader';
import styles from './styles/salesModal.module.css';
const SalesModal = ({ specificData }: { specificData: CalendarDataType }) => {
  return (
    <div className={styles.container}>
      <ModalHeader />
      <ModalBody store={specificData.store} toGo={specificData.to_go} />
      <ModalButton />
    </div>
  );
};

export default SalesModal;
