import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/sales/useCalendar';

import clsx from 'clsx';
import React from 'react';
import { BIG_MODE } from '../../calendarType/calendarType';
import styles from './styles/headerController.module.css';
import ArrowLeft from '/public/icons/calendar-arrow-left.svg';
import ArrowRight from '/public/icons/calendar-arrow-right.svg';
const HeaderController = ({ mode }: { mode: CalendarModeType }) => {
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();
  return (
    <div className={clsx(mode === BIG_MODE && styles.salesCalendarGroup)}>
      <Button
        type="button"
        className={clsx(styles.statusBtn, styles.statusBtnLeft, {
          [styles.calendarBtn]: mode === BIG_MODE,
        })}
        onClick={clickPreMonthHandler}
      >
        <ArrowLeft />
      </Button>

      <Button
        type="button"
        className={clsx(styles.statusBtn, styles.statusBtnRight, {
          [styles.calendarBtn]: mode === BIG_MODE,
        })}
        onClick={clickNextMonthHandler}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default React.memo(HeaderController);
