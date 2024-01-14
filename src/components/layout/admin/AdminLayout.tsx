import useAuthStore from '@/shared/store/auth';
import useToggleStore from '@/shared/store/toggle';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Header from './header/Header';
import CategoryTitle from './main/CategoryTitle';
import NavBar from './nav/NavBar';
import styles from './styles/AdminLayout.module.css';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminCategories = [
  { id: 1, name: '주문 내역 확인', url: '#1', active: false },
  { id: 2, name: '매출 관리', url: '/admin/sales/status', active: false },
  { id: 3, name: '플랫폼 관리', url: '#3', active: false },
  { id: 4, name: '테이블 관리', url: '/admin/table', active: true },
  { id: 5, name: '메뉴 관리', url: '/admin/menu-item', active: false },
  { id: 6, name: '가게 설정', url: '/admin/store', active: false },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { isToggle } = useToggleStore();
  const { auth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!auth) router.push('/');
  }, []);

  return (
    <div className={isToggle ? styles.adminWrapperToggle : styles.adminWrapper}>
      <Header />
      <NavBar adminCategories={adminCategories} />
      <main className={styles.mainWrapper}>
        <CategoryTitle adminCategories={adminCategories} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
