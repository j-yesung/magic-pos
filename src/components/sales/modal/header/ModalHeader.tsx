import { CloseModalType } from '@/types/sales';
import styles from './styles/modalHeader.module.css';
import CloseButton from '/public/icons/close.svg';

const ModalHeader = ({ clickCloseModal }: CloseModalType) => {
  return (
    <div className={styles.container}>
      <p>매출상세</p>
      <button className={styles.closeButton} onClick={clickCloseModal}>
        <CloseButton width={26} height={26} />
      </button>
    </div>
  );
};

export default ModalHeader;
