import { useAuthSetQuery } from '@/hooks/query/auth/useAuthSetQuery';
import { useErrorMessage } from '@/hooks/service/auth/useErrorMessage';
import { useInput } from '@/hooks/service/auth/useInput';
import { useValid } from '@/hooks/service/auth/useValid';
import useToggleState, { defaultCheckBox } from '@/shared/store/toggle';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import Button from '../common/Button';
import Input from './Input';
import FormButton from './button/FormButton';
import SignCaption from './element/SignCaption';
import styles from './styles/Auth.module.css';
import Success from '/public/icons/success.svg';

interface FormProps {
  data: Record<string, string>;
}

const AuthForm = ({ data }: FormProps) => {
  const router = useRouter();
  const path = router.pathname;
  const {
    url,
    subUrl,
    title,
    subName,
    buttonName,
    subButtonName,
    description,
    buttonSubName,
    subDescription,
    comment,
  } = data;
  const { login, signup, businessNumberCheck, sendResetPasswordEmail, updatePassword, status, message, checkEmail } =
    useAuthSetQuery();
  const isSuccess = status.data === '사업자등록번호가 인증되었습니다.' ? true : false;
  const { value, changeHandler, keyDownHandler } = useInput({
    email: '',
    password: '',
    passwordConfirm: '',
    businessName: '',
    businessNumber: '',
  });
  const { isBusinessNumberValid } = useValid(value);
  const { isPasswordValid } = useErrorMessage(value);
  const isCheckbox = useToggleState(state => state.isCheckbox);

  const clickCheckSignupHandler = async () => {
    const isChecked = await checkEmail(value);
    if (!isChecked) signup(value);
  };
  const clickLoginHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      login(value);
    }
  };

  // 이메일 저장 정보 가져오기
  useEffect(() => {
    const email = localStorage.getItem('email');
    if (email && path === '/auth/login') {
      value.email = email;
      defaultCheckBox();
    }
  }, [path]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper} onClick={() => router.push('/')}>
        <h1 className={clsx(styles.title, { [styles.black]: path !== '/auth/login' })}>{title}</h1>
      </div>
      {path === '/auth/success' && (
        <div className={styles.successImage}>
          <Success size={200} className={styles.signupSuccess} />
        </div>
      )}
      {path === '/auth/findPassword' || path === '/auth/reset' || path === '/auth/success' ? (
        <div className={styles.description}>
          <p>{description}</p>
          <p>{subDescription}</p>
        </div>
      ) : null}
      {path !== '/auth/success' && (
        <form className={styles.form}>
          <div className={styles.formInnerWrapper}>
            <Input value={value} onChangeHandler={changeHandler} onKeyDownHandler={clickLoginHandler} />
            {path === '/auth/signup' && (
              <div className={styles.formBusiness}>
                <label htmlFor="businessNumber">{comment}</label>
                <div>
                  <input
                    className={styles.input}
                    type="text"
                    id="businessNumber"
                    name="businessNumber"
                    placeholder="사업자 번호"
                    value={value.businessNumber}
                    minLength={10}
                    maxLength={10}
                    onChange={changeHandler}
                    onKeyDown={keyDownHandler}
                  />
                  <Button
                    className={styles.pushButton}
                    type="button"
                    onClick={() => businessNumberCheck(value.businessNumber)}
                    disabled={!isBusinessNumberValid}
                  >
                    {subButtonName}
                  </Button>
                </div>
                <div className={styles.bnoCheckIcon}>
                  {isSuccess && <FaCheck />}
                  <span className={isSuccess ? styles.match : styles.error}>{message}</span>
                </div>
              </div>
            )}
          </div>
          {path === '/auth/login' && (
            <SignCaption subUrl={subUrl} subName={subName} value={value} isCheckbox={isCheckbox} />
          )}
          <div className={styles.formButtonWrapper}>
            {path === '/auth/signup' && (
              <FormButton
                actionFn={clickCheckSignupHandler}
                value={value}
                btnName={buttonName}
                isSuccess={isSuccess}
                isPasswordValid={isPasswordValid}
              />
            )}
            {path === '/auth/login' && (
              <FormButton actionFn={login} value={value} btnName={buttonName} btnSubName={buttonSubName} url={url} />
            )}
            {path === '/auth/findPassword' && (
              <FormButton actionFn={sendResetPasswordEmail} value={value} btnName={buttonName} />
            )}
            {path === '/auth/reset' && <FormButton actionFn={updatePassword} value={value} btnName={buttonName} />}
          </div>
        </form>
      )}

      <div>{path === '/auth/success' && <FormButton url={url} btnSubName={buttonSubName} />}</div>
    </div>
  );
};

export default AuthForm;
