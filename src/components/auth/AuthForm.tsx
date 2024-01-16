import { useAuth } from '@/hooks/auth/useAuth';
import { useInput } from '@/hooks/auth/useInput';
import { useValid } from '@/hooks/auth/useValid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';
import Input from './Input';
import styles from './styles/Auth.module.css';

interface FormProps {
  data: Record<string, string>;
}

const AuthForm = ({ data }: FormProps) => {
  const router = useRouter();
  const path = router.pathname;
  const { url, subUrl, title, subTitle, subName, buttonName, subButtonName, description, buttonSubName } = data;
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper} onClick={() => router.push('/')}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles.subTitle}>{subTitle}</h2>
      </div>
      {path === '/auth/findPassword' || path === '/auth/reset' ? (
        <p className={styles.description}>{description}</p>
      ) : null}
      <form className={styles.form}>
        <div className={styles.formInnerWrapper}>
          <Input value={value} onChangeHandler={changeHandler} />
          {path === '/auth/signup' && (
            <div className={styles.formBusiness}>
              <label htmlFor="businessNumber">사업자등록번호를 인증해 주세요.</label>
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
              {/* 사업자등록번호 인증 여부 메세지 */}
              <span className={isSuccess ? styles.match : styles.error}>{message}</span>
            </div>
          )}
        </div>
        <div className={styles.formButtonWrapper}>
          {path === '/auth/signup' && (
            <>
              <Button type="button" onClick={() => signup(value)} disabled={!isSuccess}>
                {buttonName}
              </Button>
            </>
          )}
          {path === '/auth/login' ? (
            <>
              <Button type="button" onClick={() => login(value)}>
                {buttonName}
              </Button>
              <Button type="button" onClick={() => router.push(url)} className={styles.pushButton}>
                {buttonSubName}
              </Button>
            </>
          ) : null}
          {path === '/auth/findPassword' && (
            <Button type="button" onClick={() => sendResetPasswordEmail(value.email)}>
              {buttonName}
            </Button>
          )}
          {path === '/auth/reset' && (
            <Button type="button" onClick={() => updatePassword(value.password)}>
              {buttonName}
            </Button>
          )}
        </div>
      </form>
      <div className={styles.captionWrapper}>
        <Link className={styles.caption} href={subUrl || ''}>
          {subName}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
