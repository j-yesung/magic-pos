import styles from '../styles/AdminLayout.module.css';
import HeaderToggleButton from './HeaderToggleButton';

const Header = () => {
  return (
    <header className={styles.headerWrapper}>
      <div>
        <span>로고</span>
        <HeaderToggleButton />
      </div>
    </header>
  );
};

export default Header;
