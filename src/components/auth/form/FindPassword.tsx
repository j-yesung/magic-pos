import Button from '@/components/common/Button';
import { useAuthSetQuery } from '@/hooks/query/auth/useAuthSetQuery';
import { SubmitHandler, useForm } from 'react-hook-form';
import Input from '../element/Input';
import styles from '../styles/Auth.module.css';

const FindPassword = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { sendResetPasswordEmail } = useAuthSetQuery();
  const clickSendEmailHandler: SubmitHandler<Inputs> = data => sendResetPasswordEmail(data);

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(clickSendEmailHandler)}>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.title} ${styles.black}`}>비밀번호 찾기</h1>
        </div>
        <div className={styles.description}>
          <p>가입하신 이메일을 입력해 주세요.</p>
          <p>비밀번호 재설정 링크를 보내드립니다.</p>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.inputContanier} id="email">
            <Input type="text" placeholder="이메일" register={register} id="email" name="email" />
          </div>
          <div className={styles.buttonBox}>
            <Button type="submit" className={styles.submitButton}>
              링크 전송하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FindPassword;
