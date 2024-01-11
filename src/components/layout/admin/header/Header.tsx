import Link from 'next/link';
import styles from '../styles/AdminLayout.module.css';
import HeaderToggleButton from './HeaderToggleButton';

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div>
        <Link href="/">로고</Link>
        <HeaderToggleButton />
      </div>
    </header>
  );
};

export default Header;
