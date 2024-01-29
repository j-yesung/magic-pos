import useOrderCheckListStore from '@/shared/store/order-check-list';
import clsx from 'clsx';
import { useState } from 'react';
import Button from '../common/Button';
import styles from './styles/orderCheckListFilterButtonBox.module.css';

const OrderCheckListFilterButtonBox = () => {
  const [isDateButton, setIsDateButton] = useState(0);
  const { setListTYpe } = useOrderCheckListStore();

  const clickDayButtonHandler = () => {
    setListTYpe('day');
    setIsDateButton(1);
  };
  const clickWeekButtonHandler = () => {
    setListTYpe('week');
    setIsDateButton(2);
  };
  const clickMonthButtonHandler = () => {
    setListTYpe('month');
    setIsDateButton(3);
  };
  const clickDateButtonHandler = () => {
    setIsDateButton(4);
  };
  const clickResetButtonHandler = () => {
    setListTYpe('default');
    setIsDateButton(0);
  };

  return (
    <>
      <div className={styles['order-check-list-filter-box']}>
        <Button
          type="button"
          onClick={clickDayButtonHandler}
          className={clsx(isDateButton === 1 && styles['button-focus'])}
        >
          오늘
        </Button>
        <Button
          type="button"
          onClick={clickWeekButtonHandler}
          className={clsx(isDateButton === 2 && styles['button-focus'])}
        >
          이번 주
        </Button>
        <Button
          type="button"
          onClick={clickMonthButtonHandler}
          className={clsx(isDateButton === 3 && styles['button-focus'])}
        >
          이번 달
        </Button>
        <Button
          type="button"
          onClick={clickDateButtonHandler}
          className={clsx(isDateButton === 4 && styles['button-focus'])}
        >
          날짜 선택
        </Button>
        <Button type="button" onClick={clickResetButtonHandler}>
          초기화
        </Button>
      </div>
      <div className={clsx(styles['order-check-list-Date-box'], isDateButton === 4 && styles['active'])}>
        <input type="date" name="" id="" />
        <span>~</span>
        <input type="date" name="" id="" />
        <Button type="button">완료</Button>
      </div>
    </>
  );
};

export default OrderCheckListFilterButtonBox;
