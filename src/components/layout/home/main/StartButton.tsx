import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const StartButton = () => {
  const router = useRouter();

  const clickStartHandler = () => {
    // 로그인 세션 확인하고 관리자 페이지로 이동 or 로그인 페이지로 이동
    router.push('/auth/admin/');
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
