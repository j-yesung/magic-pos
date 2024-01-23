import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales/sales';
import clsx from 'clsx';
import styles from './styles/headerController.module.css';
import ArrowLeft from '/public/icons/calendar-arrow-left.svg';
import ArrowRight from '/public/icons/calendar-arrow-right.svg';
const HeaderController = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();
  return (
    <div className={clsx(!isChangeView && styles.salesCalendarGroup)}>
      <Button
        type="button"
        className={clsx(styles.statusBtn, styles.statusBtnLeft, !isChangeView && styles.calendarBtn)}
        onClick={clickPreMonthHandler}
      >
        <ArrowLeft />
      </Button>

      <Button
        type="button"
        className={clsx(styles.statusBtn, styles.statusBtnRight, !isChangeView && styles.calendarBtn)}
        onClick={clickNextMonthHandler}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default HeaderController;
