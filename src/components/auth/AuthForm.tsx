import { useAuth } from '@/hooks/auth/useAuth';
import { useErrorMessage } from '@/hooks/auth/useErrorMessage';
import { useInput } from '@/hooks/auth/useInput';
import { useValid } from '@/hooks/auth/useValid';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from '../common/Button';
import Input from './Input';
import FormButton from './button/FormButton';
import styles from './styles/Auth.module.css';

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
    subTitle,
    subName,
    buttonName,
    subButtonName,
    description,
    buttonSubName,
    subDescription,
    comment,
  } = data;
  const { login, signup, businessNumberCheck, sendResetPasswordEmail, updatePassword, status, message } = useAuth();
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper} onClick={() => router.push('/')}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subTitle}>{subTitle}</h2>
      </div>
      {path === '/auth/success' && (
        <div className={styles.successImage}>
          <Image src="/images/image-success.png" width={100} height={100} alt="success" priority />
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
            <Input value={value} onChangeHandler={changeHandler} />
            {path === '/auth/signup' && (
              <div className={styles.formBusiness}>
                <label htmlFor="businessNumber">{comment}</label>
                <div>
                  <input
                    className={styles.input}
                    type="text"
                    id="businessNumber"
                    name="businessNumber"
                    placeholder="사업자등록번호 (10자리)"
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
                <span className={isSuccess ? styles.match : styles.error}>{message}</span>
              </div>
            )}
          </div>
          <div className={styles.formButtonWrapper}>
            {path === '/auth/signup' && (
              <FormButton
                actionFn={signup}
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
      {path === '/auth/login' && (
        <div className={styles.captionWrapper}>
          <Link className={styles.caption} href={subUrl || ''}>
            {subName}
          </Link>
        </div>
      )}
      <div>{path === '/auth/success' && <FormButton url={url} btnSubName={buttonSubName} />}</div>
    </div>
  );
};

export default AuthForm;
