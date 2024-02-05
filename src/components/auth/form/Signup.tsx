import Button from '@/components/common/Button';
import { useAuthSetQuery } from '@/hooks/query/auth/useAuthSetQuery';
import { isEmptyObject } from '@/shared/helper';
import { Fragment } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FaCheck as Check } from 'react-icons/fa6';
import { signupInput } from '../../../data/input-props';
import Input from '../element/Input';
import styles from '../styles/Auth.module.css';

const MAX_BNO_LENGTH = 10;
const SUCCESS_MSG = '사업자등록번호가 인증되었습니다.';

const Signup = () => {
  const {
    getValues,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({ mode: 'onChange' });
  const { signup, checkEmail, businessNumberCheck, status } = useAuthSetQuery();
  const isSuccessful = status.data === SUCCESS_MSG ? true : false;
  const businessNumber = getValues().businessNumber;
  const noErrors = isEmptyObject(errors);
  const allFieldsFilled = Object.values(watch()).every(value => value !== undefined && value !== '');
  const isButtonEnabled = allFieldsFilled && noErrors && isSuccessful;
  const isSuccess = businessNumber && businessNumber.length === MAX_BNO_LENGTH;

  const clickSignupHandler: SubmitHandler<Inputs> = async data => {
    const isChecked = await checkEmail(data);
    if (!isChecked) signup(data);
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(clickSignupHandler)}>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.title} ${styles.black}`}>회원가입</h1>
        </div>
        <div className={styles.fieldContainer}>
          {signupInput.map(field => {
            const validation = field.validateFunc
              ? { ...field.validation, ...field.validateFunc(watch('password')) }
              : field.validation;
            const pwd = watch('password');
            const confirmPwd = watch('confirmPassword');
            const isPwdMatch = pwd && confirmPwd && pwd === confirmPwd;

            return (
              <Fragment key={field.unique}>
                {field.name === 'businessNumber' ? (
                  <div className={styles.businessNumberContainer}>
                    <div className={styles.businessInputContainer} id={field.name}>
                      <Input
                        id={field.id}
                        label={field.label}
                        type={field.type}
                        minLength={field.minLength}
                        maxLength={field.maxLength}
                        placeholder={field.placeholder}
                        register={register}
                        name={field.name}
                        validation={validation}
                        error={errors[field.name]}
                        isSuccessful={isSuccessful}
                      />
                      <Button
                        className={`${styles.pushButton} ${styles.widthEmpty}`}
                        type="button"
                        onClick={() => businessNumberCheck(businessNumber)}
                        disabled={!isSuccess}
                      >
                        인증하기
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className={styles.inputContanier} id={field.name}>
                    <Input
                      id={field.id}
                      label={field.label}
                      type={field.type}
                      minLength={field.minLength}
                      maxLength={field.maxLength}
                      placeholder={field.placeholder}
                      register={register}
                      name={field.name}
                      validation={validation}
                      error={errors[field.name]}
                    />
                  </div>
                )}
                {errors[field.name]?.message && <p className={styles.error}>{errors[field.name]?.message}</p>}
                {isPwdMatch && field.name === 'confirmPassword' && (
                  <div className={styles.success}>
                    <Check />
                    <p>{'비밀번호가 일치합니다.'}</p>
                  </div>
                )}
                {field.name === 'businessNumber' && status.data && (
                  <div className={isSuccessful ? styles.success : styles.error}>
                    {isSuccessful && <Check />}
                    <p>{status.data}</p>
                  </div>
                )}
              </Fragment>
            );
          })}

          <Button className={styles.signupButton} type="submit" disabled={!isButtonEnabled}>
            회원가입
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
