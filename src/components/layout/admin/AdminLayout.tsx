import Header from '@/components/layout/admin/header/Header';
import NavBar from '@/components/layout/admin/nav/NavBar';
import styles from '@/components/layout/admin/styles/AdminLayout.module.css';

type AdminLayoutProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className={styles.adminWrapper}>
      <Header />
      <NavBar />
      <main className={styles.mainWrapper}>{children}</main>
    </div>
  );
};

export default AdminLayout;
