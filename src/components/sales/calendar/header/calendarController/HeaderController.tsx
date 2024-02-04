import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesToggle from '@/shared/store/sales/salesToggle';
import clsx from 'clsx';
import React from 'react';
import styles from './styles/headerController.module.css';
import ArrowLeft from '/public/icons/calendar-arrow-left.svg';
import ArrowRight from '/public/icons/calendar-arrow-right.svg';
const HeaderController = ({ mode }: { mode: 'mini' | 'big' }) => {
  const isChangeView = useSalesToggle(state => state.isChangeView);
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();
  return (
    <div className={clsx(mode === 'big' && styles.salesCalendarGroup)}>
      <Button
        type="button"
        className={clsx(styles.statusBtn, styles.statusBtnLeft, {
          [styles.calendarBtn]: mode === 'big',
        })}
        onClick={clickPreMonthHandler}
      >
        <ArrowLeft />
      </Button>

      <Button
        type="button"
        className={clsx(styles.statusBtn, styles.statusBtnRight, {
          [styles.calendarBtn]: mode === 'big',
        })}
        onClick={clickNextMonthHandler}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default React.memo(HeaderController);
