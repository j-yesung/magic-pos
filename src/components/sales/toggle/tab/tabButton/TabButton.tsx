import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles/tabButton.module.css';
const TabButton = () => {
  const TODAY = 'today';
  const MONTHS = 'months';
  const WEEKS = 'weeks';

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
          [styles.active]: clickedTab === WEEKS,
        })}
        onClick={async () => await clickWeeksChartHandler().then(() => setClickedTab(WEEKS))}
      >
        이번 주
      </Button>
      <Button
        type="button"
        className={clsx(styles.dateButton, {
          [styles.active]: clickedTab === MONTHS,
        })}
        onClick={async () => clickMonthsChartHandler().then(() => setClickedTab(MONTHS))}
      >
        이번 달
      </Button>
    </div>
  );
};

export default TabButton;
