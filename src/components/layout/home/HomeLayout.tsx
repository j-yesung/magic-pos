import useToggleState, { resetToggle } from '@/shared/store/toggle';
import { useEffect } from 'react';
import Footer from './footer/Footer';
import Contents from './main/Contents';
import styles from './styles/Home.module.css';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const isChecked = useToggleState(state => state.isChecked);

  useEffect(() => {
    return () => {
      if (!isChecked) resetToggle();
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {/* <Header /> */}
      <main className={styles.mainWrapper}>
        <Contents />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
