import usePlatForm from '@/hooks/platform/usePlatForm';
import FormButton from './FormButton/FormButton';
import FormBody from './formBody/FormBody';
import FormHeader from './formHeader/FormHeader';
import styles from './styles/form.module.css';
const Form = () => {
  const { submitAddCard } = usePlatForm();

  return (
    <form onSubmit={submitAddCard} className={styles.formContainer}>
      <FormHeader />
      <FormBody />

      <FormButton />
    </form>
  );
};

export default Form;
