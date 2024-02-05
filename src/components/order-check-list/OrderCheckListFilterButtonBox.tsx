import useFilterButton from '@/hooks/order-check-list/useFilterButton';
import useOrderCheckListStore from '@/shared/store/order-check-list';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { IoCalendarClearOutline } from 'react-icons/io5';
import Button from '../common/Button';
import Calendar from '../sales/calendar/Calendar';
import { MINI_MODE } from '../sales/calendar/calendarType/calendarType';
import styles from './styles/orderCheckListFilterButtonBox.module.css';

const OrderCheckListFilterButtonBox = () => {
  const { startDate, endDate, setEndTime } = useOrderCheckListStore();
  const { isDateButton, clickFilterButtonHandler } = useFilterButton();
  const [isStartCalender, setIsStartCalender] = useState(false);
  const [isEndCalender, setIsEndCalender] = useState(false);

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
        <div>
          {isStartCalender && (
            <div
              className={styles['calendar-BG']}
              onClick={() => {
                setIsStartCalender(false);
                setIsEndCalender(false);
              }}
            ></div>
          )}
          <div
            className={styles['date-calender']}
            onClick={() => {
              setIsStartCalender(true);
              setIsEndCalender(false);
            }}
          >
            <span>{startDate}</span>
            <IoCalendarClearOutline className={styles.calendarIcon} width={26} height={26} />
          </div>
          {isStartCalender && (
            <div className={styles['calendar']}>
              <Calendar mode={MINI_MODE} page={'ORDER_START_PAGE'} />
            </div>
          )}
        </div>
        <span>~</span>
        <div>
          {isEndCalender && (
            <div
              className={styles['calendar-BG']}
              onClick={() => {
                setIsStartCalender(false);
                setIsEndCalender(false);
              }}
            ></div>
          )}
          <div
            className={styles['date-calender']}
            onClick={() => {
              setIsStartCalender(false);
              setIsEndCalender(true);
            }}
          >
            <span>{endDate}</span>
            <IoCalendarClearOutline className={styles.calendarIcon} width={26} height={26} />
          </div>
          {isEndCalender && (
            <div className={styles['calendar']}>
              <Calendar mode={MINI_MODE} page={'ORDER_END_PAGE'} />
            </div>
          )}
        </div>
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
