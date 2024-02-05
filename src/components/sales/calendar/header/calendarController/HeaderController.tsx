import Button from '@/components/common/Button';
import { useCalendar } from '@/hooks/service/sales/useCalendar';

import { CalendarModeType } from '@/types/calendar';
import clsx from 'clsx';
import React from 'react';
import { BIG_MODE, MINI_MODE } from '../../calendarType/calendarType';
import styles from './styles/headerController.module.css';
import ArrowLeft from '/public/icons/calendar-arrow-left.svg';
import ArrowRight from '/public/icons/calendar-arrow-right.svg';
const HeaderController = ({ mode }: { mode: CalendarModeType }) => {
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();
  return (
    <div className={clsx(mode === BIG_MODE && styles.bigCalendarGroup)}>
      <Button
        type="button"
        className={clsx(styles.calendarBaseBtn, {
          [styles.miniBtnLeft]: mode === MINI_MODE,
          [styles.bigCalendarBtn]: mode === BIG_MODE,
        })}
        onClick={clickPreMonthHandler}
      >
        <ArrowLeft />
      </Button>

      <Button
        type="button"
        className={clsx(styles.calendarBaseBtn, {
          [styles.miniBtnRight]: mode === MINI_MODE,
          [styles.bigCalendarBtn]: mode === BIG_MODE,
        })}
        onClick={clickNextMonthHandler}
      >
        <ArrowRight />
      </Button>
    </div>
  );
};

export default React.memo(HeaderController);
