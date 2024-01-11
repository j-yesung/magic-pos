import Footer from './footer/Footer';
import Header from './header/Header';
import Content from './main/Content';
import styles from './styles/Home.module.css';

interface HomeLayoutProps {
  children: React.ReactNode;
}

const HomeLayout = ({ children }: HomeLayoutProps) => {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.mainWrapper}>
        <Content />
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default HomeLayout;
