import useFilterButton from '@/hooks/order-check-list/useFilterButton';
import useOrderCheckListStore from '@/shared/store/order-check-list';
import clsx from 'clsx';
import { useEffect } from 'react';
import Button from '../common/Button';
import styles from './styles/orderCheckListFilterButtonBox.module.css';

const OrderCheckListFilterButtonBox = () => {
  const { startDate, endDate, setEndTime } = useOrderCheckListStore();
  const { isDateButton, clickFilterButtonHandler, changeStartTimeHandler, changeEndTimeHandler } = useFilterButton();

  useEffect(() => {
    if (startDate > endDate) {
      setEndTime(startDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <div className={styles['order-check-list-filter-box']}>
      <div className={styles['choice-date-button-wrapper']}>
        <Button
          type="button"
          onClick={() => {
            clickFilterButtonHandler('day', 1, false);
          }}
          className={clsx(isDateButton === 1 && styles['button-focus'])}
        >
          오늘
        </Button>
        <Button
          type="button"
          onClick={() => {
            clickFilterButtonHandler('week', 2, false);
          }}
          className={clsx(isDateButton === 2 && styles['button-focus'])}
        >
          이번 주
        </Button>
        <Button
          type="button"
          onClick={() => {
            clickFilterButtonHandler('month', 3, false);
          }}
          className={clsx(isDateButton === 3 && styles['button-focus'])}
        >
          이번 달
        </Button>
      </div>
      <div className={clsx(styles['select-date-button-wrapper'])}>
        <input
          type="date"
          value={startDate}
          onChange={e => {
            changeStartTimeHandler(e);
          }}
        />
        <span>~</span>
        <input
          type="date"
          min={startDate}
          value={endDate}
          onChange={e => {
            changeEndTimeHandler(e);
          }}
        />
        <Button
          type="button"
          onClick={() => {
            clickFilterButtonHandler('selectDate', 0, true);
          }}
          className={styles['button-focus']}
        >
          조회
        </Button>
        <Button
          type="button"
          onClick={() => {
            clickFilterButtonHandler('default', 0, false);
          }}
        >
          초기화
        </Button>
      </div>
    </div>
  );
};

export default OrderCheckListFilterButtonBox;
