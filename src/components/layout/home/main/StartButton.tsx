import useToast from '@/hooks/toast/useToast';
import useAuthStore from '@/shared/store/auth';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const StartButton = () => {
  const router = useRouter();
  const auth = useAuthStore(state => state.auth);
  const { toast } = useToast();

  const clickStartHandler = () => {
    auth
      ? router.push('/admin/management')
      : toast('로그인 후 이용해 주세요.', {
          type: 'warn',
          position: 'top-center',
          showCloseButton: false,
          autoClose: 2000,
        });
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
