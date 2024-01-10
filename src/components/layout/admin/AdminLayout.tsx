import useToggleStore from '@/shared/store/toggle';
import Header from './header/Header';
import NavBar from './nav/NavBar';
import styles from './styles/AdminLayout.module.css';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isToggle } = useToggleStore();

  return (
    <div className={isToggle ? styles.adminWrapperToggle : styles.adminWrapper}>
      <Header />
      <NavBar />
      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
};

export default AdminLayout;
