import { useAuth } from '@/hooks/auth/useAuth';
import { useInput } from '@/hooks/auth/useInput';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Button from './Button';
import Input from './Input';
import styles from './styles/Auth.module.css';

interface FormProps {
  data: {
    url: string;
    caption: string;
    subName?: string;
    buttonName: string;
  };
}

const SignForm = ({ data }: FormProps) => {
  const path = useRouter().pathname;
  const { url, subName, caption, buttonName } = data;
  const { signup, login, businessNumberCheck } = useAuth();
  const { value, onChangeHandler } = useInput();

  const signUpClickHandler = () => signup(value);
  const loginClickHandler = () => login(value);

  return (
    <div className={styles['wrapper']}>
      <div className={styles['title-wrapper']}>
        <h1 className={styles['title']}>편리함의 시작</h1>
        <h2 className={styles['sub-title']}>Magic Pos</h2>
      </div>
      <form className={styles['form']}>
        <div className={styles['form-inner-wrapper']}>
          <Input value={value} onChangeHandler={onChangeHandler} />
        </div>
        <div className={styles['form-button-wrapper']}>
          {path === '/auth/signup' && (
            <Button type="button" onClick={() => businessNumberCheck(value.businessNumber)}>
              사업자등록번호 인증
            </Button>
          )}
          <Button type="button" onClick={path === '/auth/signup' ? signUpClickHandler : loginClickHandler}>
            {buttonName}
          </Button>
        </div>
      </form>

      <div className={styles['caption-wrapper']}>
        <Link className={styles['caption']} href={url}>
          {caption}
        </Link>
        <Link className={styles['caption']} href={url}>
          {subName}
        </Link>
      </div>
    </div>
  );
};

export default SignForm;
