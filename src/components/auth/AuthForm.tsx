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
  const { url, subUrl, title, subTitle, subName, caption, buttonName, subButtonName, description } = data;
  const { login, signup, businessNumberCheck, sendResetPasswordEmail, updatePassword } = useAuth();
  const { value, changeHandler, keyDownHandler } = useInput();
  const { validateCheck, isBusinessNumberValid } = useValid(value);

  const signUpClickHandler = () => {
    if (validateCheck()) {
      signup(value);
    }
  };
  const loginClickHandler = () => {
    if (validateCheck()) {
      login(value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles['title-wrapper']} onClick={() => router.push('/')}>
        <h1 className={styles.title}>{title}</h1>
        <h2 className={styles['sub-title']}>{subTitle}</h2>
      </div>
      {path === '/auth/findPassword' || path === '/auth/reset' ? (
        <p className={styles['description']}>{description}</p>
      ) : null}
      <form className={styles.form}>
        <div className={styles['form-inner-wrapper']}>
          <Input value={value} onChangeHandler={changeHandler} onKeyDownHandler={keyDownHandler} />
        </div>
        <div className={styles['form-button-wrapper']}>
          {path === '/auth/signup' && (
            <Button
              type="button"
              onClick={() => businessNumberCheck(value.businessNumber)}
              disabled={!isBusinessNumberValid}
            >
              {subButtonName}
            </Button>
          )}
          {path === '/auth/signup' || path === '/auth/login' ? (
            <Button type="button" onClick={path === '/auth/signup' ? signUpClickHandler : loginClickHandler}>
              {buttonName}
            </Button>
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

      <div className={styles['caption-wrapper']}>
        <Link className={styles.caption} href={url || ''}>
          {caption}
        </Link>
        <Link className={styles.caption} href={subUrl || ''}>
          {subName}
        </Link>
      </div>
    </div>
  );
};

export default AuthForm;
