import Button from '@/components/common/Button';
import { useDataHandler } from '@/hooks/sales/useDataHandler';
import useCalendarStore from '@/shared/store/sales/calendar';
import useSalesStore from '@/shared/store/sales/sales';
import clsx from 'clsx';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './styles/tabButton.module.css';
const TabButton = () => {
  const TODAY = 'today';
  const MONTH = 'month';
  const WEEK = 'week';

  const isChangeView = useSalesStore(state => state.isChangeView);
  const selectedDate = useCalendarStore(state => state.selectedDate);

  const { clickMoveTodayHandler, clickWeeksChartHandler, clickMonthsChartHandler } = useDataHandler();

  const [clickedTab, setClickedTab] = useState(TODAY);

  useEffect(() => {
    return () => {
      setClickedTab(TODAY);
    };
  }, []);

  return (
    <div className={isChangeView ? styles.dateWrapper : styles.hiddenComponent}>
      <Button
        type="button"
        className={clsx(styles.dateButton, {
          /**
           * moment() 대신 useCalendarStore에 있는 today value를 사용 할수 도 있었지만 웬만하면 zustand에서 value 값은 하나만 가져오기 위함입니다.
           */
          [styles.active]: clickedTab === TODAY && moment().isSame(selectedDate, 'day'),
        })}
        onClick={async () => {
          await clickMoveTodayHandler().then(() => setClickedTab(TODAY));
        }}
      >
        오늘
      </Button>
      <Button
        type="button"
        className={clsx(styles.dateButton, {
          [styles.active]: clickedTab === WEEK && moment().isSame(selectedDate, 'week'),
        })}
        onClick={async () => await clickWeeksChartHandler().then(() => setClickedTab(WEEK))}
      >
        이번 주
      </Button>
      <Button
        type="button"
        className={clsx(styles.dateButton, {
          [styles.active]: clickedTab === MONTH && moment().isSame(selectedDate, 'month'),
        })}
        onClick={async () => clickMonthsChartHandler().then(() => setClickedTab(MONTH))}
      >
        이번 달
      </Button>
    </div>
  );
};

export default TabButton;
