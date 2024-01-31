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
  const clickDateButtonHandler = () => {
    setIsDateButton(4);
  };
  const clickResetButtonHandler = () => {
    setListType('default');
    setIsDateButton(0);
  };

  const clickSelectDateButtonHandler = () => {
    refetch();
    setListType('selectDate');
  };
  const changeStartTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setStartTime(e.target.value);
  };
  const changeEndTimeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setEndTime(e.target.value);
  };

  return (
    <div className={styles['order-check-list-filter-wrapper']}>
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
        <input type="date" value={startDate} onChange={changeStartTimeHandler} />
        <span>~</span>
        <input type="date" value={endDate} onChange={changeEndTimeHandler} />
        <Button type="button" onClick={clickSelectDateButtonHandler}>
          완료
        </Button>
      </div>
    </div>
  );
};

export default OrderCheckListFilterButtonBox;
