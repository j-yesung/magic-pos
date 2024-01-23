import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import styles from './styles/headerController.module.css';
import ArrowLeft from '/public/icons/calendar-arrow-left.svg';
import ArrowRight from '/public/icons/calendar-arrow-right.svg';
const HeaderController = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();
  return (
    <div className={clsx(styles.btnGroup, !isChangeView && styles.calendarBtnGroup)}>
      <Button type="button" className={clsx(!isChangeView && styles.calendarBtn)} onClick={clickPreMonthHandler}>
        <ArrowLeft />
      </Button>

      <Button type="button" className={clsx(!isChangeView && styles.calendarBtn)} onClick={clickNextMonthHandler}>
        <ArrowRight />
      </Button>
    </div>
  );
};

export default HeaderController;
