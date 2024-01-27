import { adminCategories } from '@/data/admin';
import Header from './header/Header';
import CategoryTitle from './main/CategoryTitle';
import Sidebar from './nav/Sidebar';
import styles from './styles/AdminLayout.module.css';

const AdminLayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.adminWrapper}>
      <Sidebar adminCategories={adminCategories} />
      <Header />
      <main className={styles.mainWrapper}>
        <CategoryTitle adminCategories={adminCategories} />
        <div className={styles.childrenWrapper}>{children}</div>
      </main>
    </div>
  );
};

export default AdminLayoutWrapper;
