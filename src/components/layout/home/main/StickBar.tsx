import Link from 'next/link';
import styles from '../styles/StickBar.module.css';

const StickBar = () => {
  return (
    <div className={styles.fixedWrapper}>
      <Link className={styles.logo} href="/">
        Magic pos
      </Link>

      <div className={styles.tabArea}>
        <Link href="/auth/login">로그인</Link>
        <Link href="/auth/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default StickBar;
