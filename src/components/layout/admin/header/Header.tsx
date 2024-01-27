import styles from '../styles/AdminLayout.module.css';
import HamburgerMenu from './HamburgerMenu';
import HeaderToggleButton from './HeaderToggleButton';
import Logo from '/public/logo.svg';

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.leftContainer}>
        <HamburgerMenu />
        <Logo className={styles.logo} width={'20rem'} height={'3rem'} />
      </div>
      <div className={styles.rightContainer}>
        <HeaderToggleButton />
      </div>
    </header>
  );
};

export default Header;
