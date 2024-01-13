import { useRouter } from 'next/router';
import styles from '../styles/Footer.module.css';
import Logo from '/public/logo.svg';

const Footer = () => {
  const router = useRouter();

  return (
    <footer className={styles.wrapper}>
      <Logo className={styles.logo} width={200} height={30} onClick={() => router.push('/')} />
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
