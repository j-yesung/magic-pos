import { useAuth } from '@/hooks/auth/useAuth';
import useAuthStore from '@/shared/store/auth';
import Link from 'next/link';
import styles from '../styles/StickBar.module.css';

const StickBar = () => {
  const { session } = useAuthStore();
  const { logout } = useAuth();

  return (
    <div className={styles.wrapper}>
      <Link className={styles.logo} href="/">
        Magic pos
      </Link>

      <div className={styles.tabArea}>
        {session ? (
          <Link href="/" onClick={() => logout()}>
            로그아웃
          </Link>
        ) : (
          <>
            <Link href="/auth/login">로그인</Link>
            <Link href="/auth/signup">회원가입</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default StickBar;
