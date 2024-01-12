import useAuthStore from '@/shared/store/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const StartButton = () => {
  const router = useRouter();
  const { session } = useAuthStore();

  const clickStartHandler = () => {
    session ? router.push('/admin/management') : router.push('/auth/login/');
  };

  return (
    <div className={styles.startWrapper}>
      <button className={styles.startButton} onClick={clickStartHandler}>
        시작하기
      </button>
    </div>
  );
};

export default StartButton;
