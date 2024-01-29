import Button from '@/components/common/Button';
import { CloseModalType } from '@/types/sales';
import styles from './styles/modalButton.module.css';
const ModalButton = ({ clickCloseModal }: CloseModalType) => {
  return (
    <div className={styles.buttonContainer} onClick={clickCloseModal}>
      <Button type="button" className={styles.button}>
        닫기
      </Button>
    </div>
  );
};

export default ModalButton;
