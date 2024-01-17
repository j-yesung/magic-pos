import { adminCategories } from '@/data/admin-categories';
import useAuthStore from '@/shared/store/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from './header/Header';
import CategoryTitle from './main/CategoryTitle';
import Sidebar from './nav/Sidebar';
import styles from './styles/AdminLayout.module.css';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { auth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth) router.push('/');
  }, [auth, router]);

  return (
    <div className={styles.adminWrapper}>
      <Sidebar adminCategories={adminCategories} />
      <Header />
      <main className={styles.mainWrapper}>
        <CategoryTitle adminCategories={adminCategories} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
