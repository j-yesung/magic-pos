import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales/sales';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles/tabButton.module.css';
const TabButton = () => {
  const TODAY = 'today';
  const MONTH = 'month';
  const WEEK = 'week';

  const isChangeView = useSalesStore(state => state.isChangeView);
  const { clickMoveTodayHandler, clickWeeksChartHandler, clickMonthsChartHandler } = useCalendar();

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
          [styles.active]: clickedTab === TODAY,
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
          [styles.active]: clickedTab === WEEK,
        })}
        onClick={async () => await clickWeeksChartHandler().then(() => setClickedTab(WEEK))}
      >
        이번 주
      </Button>
      <Button
        type="button"
        className={clsx(styles.dateButton, {
          [styles.active]: clickedTab === MONTH,
        })}
        onClick={async () => clickMonthsChartHandler().then(() => setClickedTab(MONTH))}
      >
        이번 달
      </Button>
    </div>
  );
};

export default TabButton;
