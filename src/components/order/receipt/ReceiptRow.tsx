import React from 'react';
import styles from './styles/ReceiptRow.module.css';
import Image from 'next/image';
import clsx from 'clsx';

const ReceiptRow = () => {
  return (
    <div className={styles.container}>
      <Image src={'/next.svg'} alt={'음식'} width={100} height={100}></Image>
      <div className={styles.info}>
        <div className={clsx(styles.info, styles.gap10)}>
          <span className={styles.productName}>아메리카노</span>
          <span className={styles.productOption}>옵션</span>
        </div>
        <span className={styles.productPrice}>가격</span>
      </div>
      <div className={styles.productEa}>1</div>
    </div>
  );
};

export default ReceiptRow;
