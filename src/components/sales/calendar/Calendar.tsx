import { useDataHandler } from '@/hooks/service/sales/useDataHandler';
import { CalendarType } from '@/types/calendar';
import clsx from 'clsx';
import React from 'react';
import { BIG_MODE, CALENDAR_PAGE, MINI_MODE, STATUS_PAGE } from './calendarType/calendarType';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';

/**
 *
 * @param children ReactNode
 * @param mode mini , big
 * @param page page는 조건부 props로 기능을 주고 싶을 때 사용합니다. Cell.tsx, CellItem.tsx에 주석처리로 기능 예시를 써놓았습니다.
 * 물론 page에 따른 CellItem.tsx에서 style을 할 수 있게끔 주석과 예시? 써놓았습니다.
 * @returns
 */
const Calendar = ({ children, mode, page }: CalendarType) => {
  const { clickShowDataOfDateHandler, clickShowSalesModal } = useDataHandler();
  return (
    <div
      className={clsx({
        [styles.miniCalendar]: mode === MINI_MODE,
        [styles.bigCalendar]: mode === BIG_MODE,
      })}
    >
      <div
        className={clsx({
          [styles.miniCalendarHeaderWrapper]: mode === MINI_MODE,
        })}
      >
        <Header mode={mode} />
        {children}
      </div>

      <div
        className={clsx({
          [styles.bigBodyWrapper]: mode === BIG_MODE,
        })}
      >
        <Days mode={mode} />
        <Cell
          mode={mode}
          page={page}
          {...(page === STATUS_PAGE && {
            clickShowDataOfDateHandler: clickShowDataOfDateHandler,
          })}
          {...(page === CALENDAR_PAGE && {
            clickShowSalesModal: clickShowSalesModal,
          })}
        />
      </div>
    </div>
  );
};

export default React.memo(Calendar);
