import Button from '@/components/common/Button';
import { useDataHandler } from '@/hooks/sales/useDataHandler';
import useDayState from '@/shared/store/sales/salesDay';
import clsx from 'clsx';
import moment from 'moment';
import { useEffect, useState } from 'react';
import styles from './styles/tabButton.module.css';
const TabButton = () => {
  const TODAY = 'today';
  const MONTH = 'month';
  const WEEK = 'week';

  const selectedDate = useDayState(state => state.selectedDate);

  const { clickMoveTodayHandler, clickWeeksChartHandler, clickMonthsChartHandler } = useDataHandler();

  const [clickedTab, setClickedTab] = useState(TODAY);

  useEffect(() => {
    return () => {
      setClickedTab(TODAY);
    };
  }, []);
  return (
    <div className={styles.dateWrapper}>
      <Button
        type="button"
        className={clsx(styles.dateButton, {
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
