import Header from '@/components/layout/admin/header/Header';
import NavBar from '@/components/layout/admin/nav/NavBar';
import styles from '@/components/layout/admin/styles/AdminLayout.module.css';
import useToggleStore from '@/shared/store/toggle';

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
