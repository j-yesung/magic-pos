import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

interface ButtonProps {
  actionFn?: (value: Record<string, string>) => void;
  value?: Record<string, string>;
  btnName?: string;
  btnSubName?: string;
  url?: string;
  isSuccess?: boolean;
}

const FormButton = ({ actionFn, value, btnName, btnSubName, url, isSuccess }: ButtonProps) => {
  const router = useRouter();

  return (
    <>
      {actionFn && (
        <Button
          type="button"
          onClick={() => actionFn && actionFn(value!)}
          disabled={isSuccess !== undefined && !isSuccess}
        >
          {btnName}
        </Button>
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
