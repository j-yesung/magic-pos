import Button from '@/components/common/Button';
import usePlatForm from '@/hooks/platform/usePlatForm';
import clsx from 'clsx';
import styles from './styles/formButton.module.css';
const FormButton = () => {
  const { closeAddFormModal } = usePlatForm();
  return (
    <div className={styles.buttonGroup}>
      <Button type="button" className={styles.button} onClick={closeAddFormModal}>
        취소
      </Button>
      <Button type="submit" className={clsx(styles.button, styles.addButton)}>
        등록
      </Button>
    </div>
  );
};

export default FormButton;
