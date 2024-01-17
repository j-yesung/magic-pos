import { useRouter } from 'next/router';
import styles from '../styles/AdminLayout.module.css';
import HamburgerMenu from './HamburgerMenu';
import HeaderToggleButton from './HeaderToggleButton';
import Logo from '/public/logo.svg';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.firstContainer}>
        <HamburgerMenu />
        <Logo className={styles.logo} width={200} height={30} onClick={() => router.push('/')} />
      </div>
      <div className={styles.secondContainer}>
        <HeaderToggleButton />
      </div>
    </header>
  );
};

export default Header;
