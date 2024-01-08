import React from 'react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/footer.module.css';

const Footer = () => {
  const { step } = useOrderStore();
  return (
    <footer className={styles.container}>
      {step === 0 && <div></div>}
      {step === 1 && <div></div>}
      {step === 2 && <div></div>}
      {step === 3 && <div></div>}
      {step === 4 && <div></div>}
    </footer>
  );
};

export default Footer;
