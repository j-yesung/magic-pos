import styles from '../styles/AdminLayout.module.css';
import HamburgerMenu from './HamburgerMenu';
import HeaderToggleButton from './HeaderToggleButton';
import Logo from '/public/logo.svg';

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.leftContainer}>
        <HamburgerMenu />
        <Logo className={styles.logo} width={200} height={30} />
      </div>
      <div className={styles.rightContainer}>
        <HeaderToggleButton />
      </div>
    </header>
  );
};

export default Header;
