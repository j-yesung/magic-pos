import { useRouter } from 'next/router';
import styles from '../styles/AdminLayout.module.css';
import HeaderToggleButton from './HeaderToggleButton';
import Logo from '/public/logo.svg';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.headerWrapper}>
      <div>
        <Logo className={styles.logo} width={200} height={30} onClick={() => router.push('/')} />
        <HeaderToggleButton />
      </div>
    </header>
  );
};

export default Header;
