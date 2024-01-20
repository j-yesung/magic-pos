import { adminCategories } from '@/data/admin';
import useAuthState from '@/shared/store/session';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from './header/Header';
import CategoryTitle from './main/CategoryTitle';
import Sidebar from './nav/Sidebar';
import styles from './styles/AdminLayout.module.css';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const session = useAuthState(state => state.session);
  const router = useRouter();

  useEffect(() => {
    if (!session) router.push('/');
  }, [router, session]);

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
