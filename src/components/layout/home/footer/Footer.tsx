import Image from 'next/image';
import styles from '../styles/Home.module.css';

const Footer = () => {
  return (
    <footer className={styles.footerWrapper}>
      <Image src="/logo.svg" alt="logo" width={200} height={30} />
      <div className={styles.info}>
        <p>Contact Us: jangyesung7@gmail.com</p>
        <div className={styles.textArea}>
          <p>COPYRIGHT © 2024 MAGICPOS. ALL RIGHTS RESERVED.</p>
          <p className={styles.bold}>DESIGN BY YEJIN</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
