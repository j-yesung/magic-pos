import useFetchOrderCheckList from '@/hooks/order-check-list/useFetchOrderCheckList';
import useOrderCheckListStore from '@/shared/store/order-check-list';
import clsx from 'clsx';
import { ChangeEvent, useState } from 'react';
import Button from '../common/Button';
import styles from './styles/orderCheckListFilterButtonBox.module.css';

const OrderCheckListFilterButtonBox = () => {
  const [isDateButton, setIsDateButton] = useState(0);
  const { startDate, endDate, setListType, setStartTime, setEndTime } = useOrderCheckListStore();
  const { refetch } = useFetchOrderCheckList();

  const clickDayButtonHandler = () => {
    setListType('day');
    setIsDateButton(1);
  };
  const clickWeekButtonHandler = () => {
    setListType('week');
    setIsDateButton(2);
  };
  const clickMonthButtonHandler = () => {
    setListType('month');
    setIsDateButton(3);
  };
  const clickSelectDateButtonHandler = () => {
    refetch();
    setListType('selectDate');
    setIsDateButton(0);
  };
  const clickResetButtonHandler = () => {
    setListType('default');
    setIsDateButton(0);
  };

  const changeStartTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const changeEndTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <div className={styles['order-check-list-filter-box']}>
      <div className={styles['choice-date-button-wrapper']}>
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
      </div>
      <div className={clsx(styles['select-date-button-wrapper'])}>
        <input type="date" value={startDate} onChange={changeStartTimeHandler} />
        <span>~</span>
        <input type="date" value={endDate} onChange={changeEndTimeHandler} />
        <Button type="button" onClick={clickSelectDateButtonHandler} className={styles['button-focus']}>
          조회
        </Button>
        <Button type="button" onClick={clickResetButtonHandler}>
          초기화
        </Button>
      </div>
    </div>
  );
};

export default OrderCheckListFilterButtonBox;
