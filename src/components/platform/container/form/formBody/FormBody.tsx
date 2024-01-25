import ImgForm from './imgForm/ImgForm';
import Input from './input/Input';
import styles from './styles/formBody.module.css';
const FormBody = () => {
  return (
    <div className={styles.formBody}>
      <ImgForm />
      <div className={styles.inputWrapper}>
        <Input name="link_url" type="text" placeholder="link를 넣어주세요" className={styles.input} />
        <Input className={styles.input} name="name" type="text" placeholder="어디사이트인가요?" />
      </div>
    </div>
  );
};

export default FormBody;
