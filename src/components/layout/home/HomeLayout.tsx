import useToggleState, { resetToggle } from '@/shared/store/toggle';
import { useEffect } from 'react';
import Footer from './footer/Footer';
import Contents from './main/Contents';
import ProgressBar from './main/animation/ProgressBar';
import styles from './styles/Home.module.css';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  const isChecked = useToggleState(state => state.isChecked);

  useEffect(() => {
    return () => {
      if (!isChecked) resetToggle();
    };
  }, [isChecked]);

  return (
    <>
      <style jsx global>{`
        @media only all and (max-width: 1520px) {
          html {
            font-size: 8px;
          }
        }
      `}</style>
      <div className={styles.wrapper}>
        <ProgressBar />
        <main className={styles.mainWrapper}>
          <Contents />
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomeLayout;
