import { HOME_PATH } from '@/data/url-list';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Logo from '/public/logo.svg';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.headerWrapper}>
      <Logo className={styles.logo} width={200} height={30} onClick={() => router.push(HOME_PATH)} />
    </header>
  );
};

export default Header;
