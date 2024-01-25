import Button from '@/components/common/Button';
import { setIsRegist } from '@/shared/store/platform';
import styles from './styles/button.module.css';
const AddButton = () => {
  const clickShowAddForm = () => setIsRegist(true);
  return (
    <div className={styles.buttonContainer}>
      <Button type="button" className={styles.button} onClick={clickShowAddForm}>
        추가
      </Button>
    </div>
  );
};

export default AddButton;
