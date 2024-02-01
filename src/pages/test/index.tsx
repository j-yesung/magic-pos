import Signup from '@/components/auth/form/Signup';
import styles from '@/components/auth/styles/Auth.module.css';
import { useRouter } from 'next/router';

const TestPage = () => {
  const path = useRouter().pathname;

  return (
    <div className={styles.formContainer}>
      {path === '/test' && <Signup />}
      {path === '/auth/login' && <div>로그인 페이지</div>}
    </div>
  );
};

export default TestPage;
