import HeaderToggleButton from '@/components/layout/admin/header/HeaderToggleButton';
import styles from '@/components/layout/admin/styles/AdminLayout.module.css';

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
