import React from 'react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/MenuInfo.module.css';
import { convertNumberToWon } from '@/shared/helper';

const MenuInfo = () => {
  const selectedMenu = useOrderStore(state => state.selectedMenu);

  return (
    <div className={styles.container}>
      <div>
        <h2>{selectedMenu?.name}</h2>
        <p>간단한 제품 설명이 들어갑니다. 두 줄 이상의 텍스트는 점으로 생랴ㅕㄱ...................</p>
      </div>
      <div className={styles.priceWrapper}>
        <span>가격</span>
        <span>{convertNumberToWon(selectedMenu?.price ?? 0)}</span>
      </div>
    </div>
  );
};

export default MenuInfo;
