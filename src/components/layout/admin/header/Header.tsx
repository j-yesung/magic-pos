import { useRouter } from 'next/router';
import styles from '../styles/AdminLayout.module.css';
import HamburgerMenu from './HamburgerMenu';
import HeaderToggleButton from './HeaderToggleButton';
import Logo from '/public/logo.svg';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.headerWrapper}>
      <div className={styles.container}>
        <HamburgerMenu />
        <Logo className={styles.logo} width={200} height={30} onClick={() => router.push('/')} />
      </div>
      <HeaderToggleButton />
    </header>
  );
};

export default Header;
