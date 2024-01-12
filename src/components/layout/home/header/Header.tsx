import Link from 'next/link';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.wrapper}>
      <Link href="/">Magic Pos</Link>
    </header>
  );
};

export default Header;
