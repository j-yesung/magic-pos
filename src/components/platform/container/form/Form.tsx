import Button from '@/components/common/Button';
import usePlatForm from '@/hooks/platform/usePlatForm';
import clsx from 'clsx';
import ImgForm from './img/ImgForm';
import Input from './input/Input';
import styles from './styles/form.module.css';
import CloseButton from '/public/icons/close.svg';
const Form = () => {
  const { submitAddCard, closeAddFormModal } = usePlatForm();

  return (
    <form onSubmit={submitAddCard} className={styles.formContainer}>
      <div className={styles.formHeader}>
        <p className={styles.formHeaderTitle}>새 플랫폼 등록</p>
        <button type="button" className={styles.closeButton} onClick={closeAddFormModal}>
          <CloseButton />
        </button>
      </div>
      <div className={styles.formWrapper}>
        <ImgForm />
        <div className={styles.inputWrapper}>
          <Input name="link_url" type="text" placeholder="link를 넣어주세요" className={styles.input} />
          <Input className={styles.input} name="name" type="text" placeholder="어디사이트인가요?" />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <Button type="button" className={styles.button} onClick={closeAddFormModal}>
          취소
        </Button>
        <Button type="submit" className={clsx(styles.button, styles.addButton)}>
          등록
        </Button>
      </div>
    </form>
  );
};

export default Form;
