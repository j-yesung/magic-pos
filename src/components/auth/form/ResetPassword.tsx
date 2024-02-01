import Button from '@/components/common/Button';
import { useAuthSetQuery } from '@/hooks/query/auth/useAuthSetQuery';
import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { resetPasswordInput } from '../../../data/inputData';
import styles from '../styles/Auth.module.css';
import Input from './Input';

const ResetPassword = () => {
  const { register, handleSubmit } = useForm<Inputs>({ mode: 'onSubmit' });
  const { updatePassword } = useAuthSetQuery();
  const clickUpdatePasswordHandler: SubmitHandler<Inputs> = data => {
    if (data.password === data.confirmPassword) {
      updatePassword(data);
    }
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(clickUpdatePasswordHandler)}>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.title} ${styles.black}`}>비밀번호 변경</h1>
        </div>
        <div className={styles.description}>
          <p>새로운 비밀번호를 입력해 주세요.</p>
        </div>
        <div className={styles.fieldContainer}>
          {resetPasswordInput.map(field => {
            return (
              <Fragment key={field.id}>
                <div className={styles.inputContanier} id={field.name}>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    register={register}
                    name={field.name}
                    validation={field.validation}
                  />
                </div>
              </Fragment>
            );
          })}
          <div className={styles.buttonBox}>
            <Button type="submit" className={styles.submitButton}>
              비밀번호 변경
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
