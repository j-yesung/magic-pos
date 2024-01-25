import usePlatForm from '@/hooks/platform/usePlatForm';
import styles from './styles/formHeader.module.css';
import CloseButton from '/public/icons/close.svg';
const FormHeader = () => {
  const { closeAddFormModal } = usePlatForm();
  return (
    <div className={styles.formHeader}>
      <p className={styles.formHeaderTitle}>새 플랫폼 등록</p>
      <button type="button" className={styles.closeButton} onClick={closeAddFormModal}>
        <CloseButton />
      </button>
    </div>
  );
};

export default FormHeader;
