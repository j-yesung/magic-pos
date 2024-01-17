import useAuthStore from '@/shared/store/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const StartButton = () => {
  const router = useRouter();
  const auth = useAuthStore(state => state.auth);

  const clickStartHandler = () => {
    auth ? router.push('/admin/management') : router.push('/auth/login/');
  };

  return (
    <div className={styles.startWrapper}>
      <button className={styles.startButton} onClick={clickStartHandler}>
        <p>시작하기</p>
      </button>
    </div>
  );
};

export default StartButton;
