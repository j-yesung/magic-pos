import { useAuth } from '@/hooks/auth/useAuth';
import { useEffect } from 'react';
import Footer from './footer/Footer';
import Header from './header/Header';
import Contents from './main/Contents';
import styles from './styles/Home.module.css';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  const { getUserSession } = useAuth();

  useEffect(() => {
    getUserSession();
  }, []);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainWrapper}>
        <Contents />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
