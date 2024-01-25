import usePlatForm from '@/hooks/platform/usePlatForm';
import usePlatFormStore from '@/shared/store/platform';
import FormButton from './FormButton/FormButton';
import FormBody from './formBody/FormBody';
import FormHeader from './formHeader/FormHeader';
import styles from './styles/form.module.css';
const Form = () => {
  const isEdit = usePlatFormStore(state => state.isEdit);
  const { submitAddCard, submitEditCard } = usePlatForm();
  return (
    <form onSubmit={!isEdit ? submitAddCard : submitEditCard} className={styles.formContainer}>
      <FormHeader mode={isEdit} />
      <FormBody mode={isEdit} />
      <FormButton mode={isEdit} />
    </form>
  );
};

export default Form;
