import React from 'react';
import ButtonContainer from '@/components/order/order-type/ButtonContainer';
import styles from './styles/OrderTypeContainer.module.css';
import Image from 'next/image';

/**
 * STEP1: 포장 / 매장 선택
 * @constructor
 */
const OrderTypeContainer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.chooseWrapper}>
        <h1>포장 하시나요 드시고 가시나요?</h1>
        <ButtonContainer />
      </div>
      <div className={styles.languageWrapper}>
        <Image src={'/images/image-success.png'} alt={'언어 선택'} width={50} height={50} />
        <span>Language</span>
      </div>
    </div>
  );
};

export default OrderTypeContainer;
