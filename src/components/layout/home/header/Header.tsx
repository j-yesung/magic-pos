import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <Link href="/">Magic Pos</Link>
    </header>
  );
};

export default Header;
