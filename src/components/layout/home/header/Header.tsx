import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Logo from '/public/logo.svg';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.headerWrapper}>
      <Logo className={styles.logo} width={200} height={30} onClick={() => router.push('/')} />
    </header>
  );
};

export default Header;
