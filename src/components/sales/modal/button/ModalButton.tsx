import Button from '@/components/common/Button';
import styles from './styles/modalButton.module.css';
const ModalButton = () => {
  return (
    <div className={styles.buttonContainer}>
      <Button type="button" className={styles.button}>
        닫기
      </Button>
    </div>
  );
};

export default ModalButton;
