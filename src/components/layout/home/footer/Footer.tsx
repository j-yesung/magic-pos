import Link from 'next/link';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.wrapper}>
      <Link href="/">Magic Pos</Link>
      <div className={styles.info}>
        <p>사업자등록번호: 123-45-678910 서울시 강남구 역삼동 대표: OOO</p>
        <p>E-MAIL: hisung-ah@kakao.com</p>
        <div className={styles.textArea}>
          <p>COPYRIGHT © 2024 MAGICPOS. ALL RIGHTS RESERVED.</p>
          <p className={styles.bold}>DESIGN BY YEJIN</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
