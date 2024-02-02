import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

interface ButtonProps {
  actionFn: (value: Record<string, string>) => void;
  value: Record<string, string>;
  btnName: string;
  btnSubName: string;
  url: string;
  isSuccess: boolean;
  isPasswordValid: boolean;
}

const FormButton = (props: Partial<ButtonProps>) => {
  const router = useRouter();
  const { actionFn, value, btnName, btnSubName, url, isSuccess, isPasswordValid } = props;
  const isSignUpPage = router.pathname === '/auth/signup';
  const isSuccessPage = router.pathname !== '/auth/success';

  return (
    <>
      {actionFn && isSignUpPage ? (
        <Button
          type="button"
          onClick={() => actionFn && actionFn(value!)}
          disabled={isSuccess && isPasswordValid ? false : true}
        >
          {btnName}
        </Button>
      ) : (
        <>
          {isSuccessPage && (
            <Button type="button" onClick={() => actionFn && actionFn(value!)}>
              {btnName}
            </Button>
          )}
        </>
      )}
      {url && btnSubName && (
        <Button
          type="button"
          onClick={() => router.push(url)}
          className={router.pathname === '/auth/login' ? styles.pushButton : styles.startButton}
        >
          {btnSubName}
        </Button>
      )}
    </>
  );
};

export default FormButton;
