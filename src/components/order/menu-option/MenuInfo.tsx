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
      </div>
      <div className={styles.priceWrapper}>
        <h3>가격</h3>
        <span>{convertNumberToWon(selectedMenu?.price ?? 0)}</span>
      </div>
    </div>
  );
};

export default MenuInfo;
