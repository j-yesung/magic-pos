import clsx from 'clsx';
import React, { useState } from 'react';
import Button from '../common/Button';
import styles from './styles/orderCheckListFilterButtonBox.module.css';

const OrderCheckListFilterButtonBox = () => {
  const [isDateBox, setIsDateBox] = useState(false);

  return (
    <>
      <div className={styles['order-check-list-filter-box']}>
        <Button type="button">오늘</Button>
        <Button type="button">이번 주</Button>
        <Button type="button">이번 달</Button>
        <Button
          type="button"
          onClick={() => {
            setIsDateBox(!isDateBox);
          }}
        >
          날짜 선택
        </Button>
      </div>
      <div className={clsx(styles['order-check-list-Date-box'], isDateBox && styles['active'])}>
        <input type="date" name="" id="" />
        <span>~</span>
        <input type="date" name="" id="" />
        <Button type="button">완료</Button>
      </div>
    </>
  );
};

export default OrderCheckListFilterButtonBox;
