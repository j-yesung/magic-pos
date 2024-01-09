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

const SignForm = ({ data }: FormProps) => {
  const path = useRouter().pathname;
  const { url, subUrl, title, subTitle, subName, caption, buttonName, description } = data;
  const { login, signup, businessNumberCheck, sendResetPasswordEmail } = useAuth();
  const { value, onChangeHandler, onKeyDownHandler } = useInput();
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
    <div className={styles['wrapper']}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles['title']}>{title}</h1>
        <h2 className={styles['sub-title']}>{subTitle}</h2>
      </div>
      {path === '/auth/findPassword' && <p className={styles['description']}>{description}</p>}
      <form className={styles['form']}>
        <div className={styles['form-inner-wrapper']}>
          {path !== '/auth/findPassword' ? (
            <Input value={value} onChangeHandler={onChangeHandler} onKeyDownHandler={onKeyDownHandler} />
          ) : (
            <input
              className={styles['input']}
              name="email"
              value={value.email}
              onChange={onChangeHandler}
              placeholder="이메일"
            />
          )}
        </div>
        <div className={styles['form-button-wrapper']}>
          {path === '/auth/signup' && (
            <Button
              type="button"
              onClick={() => businessNumberCheck(value.businessNumber)}
              disabled={!isBusinessNumberValid}
            >
              사업자등록번호 인증
            </Button>
          )}
          {path !== '/auth/findPassword' ? (
            <Button type="button" onClick={path === '/auth/signup' ? signUpClickHandler : loginClickHandler}>
              {buttonName}
            </Button>
          ) : (
            <Button type="button" onClick={() => sendResetPasswordEmail(value.email)}>
              {buttonName}
            </Button>
          )}
        </div>
      </form>

      <div className={styles['caption-wrapper']}>
        <Link className={styles['caption']} href={url || ''}>
          {caption}
        </Link>
        <Link className={styles['caption']} href={subUrl || ''}>
          {subName}
        </Link>
      </div>
    </div>
  );
};

export default SignForm;
