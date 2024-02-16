import { convertNumberToWon } from '@/shared/helper';
import useCalendarState from '@/shared/store/sales/salesCalendar';
import useDayState from '@/shared/store/sales/salesDay';
import { cva } from 'class-variance-authority';
import {
  getCalendarDateType,
  getCalendarMonthType,
  getStatusCalendarType,
  getStatusDateType,
  getStatusDayType,
  getStatusMonthType,
} from '../../calendarUtility/cellItemType';

import { CellItemProps } from '@/types/calendar';
import clsx from 'clsx';
import { BIG_MODE, CALENDAR_PAGE, MINI_MODE, STATUS_PAGE } from '../calendarType/calendarType';
import styles from './styles/cellItem.module.css';

type Cell = (param: CellItemProps) => JSX.Element;

const CellItem: Cell = ({
  day,
  salesData,
  getMinMaxSalesType,
  holiday,
  mode,
  page,
  clickStartTimeHandler,
  clickEndTimeHandler,
  id,
}) => {
  const SELECTED_DAY = 'SELECTEDTYPE';
  const SALES_NONE = 'NONE';
  const SALES_HAVE = 'HAVE';
  const HOLIDAY = 'HOLIDAY';
  const currentDate = useCalendarState(staet => staet.currentDate);
  const selectedDate = useDayState(state => state.selectedDate);

  const statusVariant = cva([styles.statusCalendarBase], {
    variants: {
      calendarType: {
        CURRENT: styles.currentCalendar,
        NOT_CURRENT: styles.notCurrentCalendar,
      },
      monthType: {
        CURRENT: styles.statusCurrentMonth,
        NOT_CURRENT: styles.statusNotCurrent,
      },
      dateType: {
        PREV: styles.statusPrevDate,
        CURRENT: styles.statusCurrentDate,
        AFTER: styles.statusAfterDate,
      },
      holidayType: {
        HOLIDAY: styles.statusHoliday,
      },
    },
  });
  const statusDayVariant = cva([styles.statusDayBase], {
    variants: {
      dayType: {
        SATURADAY: styles.statusSaturaday,
        SUNDAY: styles.statusSunday,
        DAY: styles.statusDay,
      },
      seletedDayType: {
        SELECTEDTYPE: styles.statusSelectedDate,
      },
    },
  });

  const calendarVariant = cva([styles.calendarBase], {
    variants: {
      calendarType: {
        CURRENT: styles.calendarCurrent,
      },
      monthType: {
        CURRENT: styles.calendarCurrentMonth,
        NOT_CURRENT: styles.calendarNotCurrentMonth,
      },
      dateType: {
        PREV: styles.statusPrevDate,
        CURRENT: styles.calendarCurrentDate,
        AFTER: styles.statusAfterDate,
      },
      salesType: {
        NONE: styles.salesNone,
        HAVE: styles.salesHave,
      },
    },
  });
  /**
   * 매출 최고 최저 숫자 color
   */
  const salesVariant = cva([styles.salesBase], {
    variants: {
      sales: {
        MAX: styles.salesMax,
        MIN: styles.salesMin,
        NONE: styles.salesNone,
      },
    },
  });
  const formatDate = day.format('YY MM D').substring(6);
  return (
    <>
      {/* sales/Status일 때 보여줄 날 css */}
      {mode === MINI_MODE && (
        <div
          className={clsx({
            [statusVariant({
              calendarType: getStatusCalendarType(day, currentDate),
              monthType: getStatusMonthType(currentDate, day),
              dateType: getStatusDateType(day),
              holidayType: holiday?.[0]?.name ? HOLIDAY : null,
            })]: page === STATUS_PAGE,

            // [styles.페이지가 주문내역이면 사용하는 style] : PAGE === ORDER_PAGE
          })}
          /** 페이지가 주문내역 확인이면 아래와 같이 하면 됩니다.
           *{...((page===ORDER && {onClick: clickHandler}))}
           */

          {...(page === 'ORDER_START_PAGE' && { onClick: clickStartTimeHandler?.(day) })}
          {...(page === 'ORDER_END_PAGE' && { onClick: clickEndTimeHandler?.(day) })}
        >
          <span
            className={statusDayVariant({
              dayType: getStatusDayType(day),
              seletedDayType: day.isSame(selectedDate, 'day') ? SELECTED_DAY : null,
            })}
            data-dayjs={day}
          >
            {formatDate}
          </span>
        </div>
      )}

      {/* sales/Calendar일 때 보여줄 날 css */}
      {mode === BIG_MODE && (
        <div
          id={id}
          className={clsx(
            page === CALENDAR_PAGE &&
              calendarVariant({
                monthType: getCalendarMonthType(day, currentDate),
                dateType: getCalendarDateType(day),
                salesType: salesData ? SALES_HAVE : SALES_NONE,
              }),
          )}
        >
          <span
            className={salesVariant({
              sales: salesData && getMinMaxSalesType?.(salesData),
            })}
          >
            {formatDate}
          </span>

          {/* sales/calendar에서 보여줄 날짜별 매출과 최저 최고 매출 CSS class입니다. */}
          <span>{salesData?.sales ? convertNumberToWon(salesData.sales) : '-'}</span>
          <p className={styles.holiday}>{holiday?.[0]?.name ?? null}</p>
        </div>
      )}
    </>
  );
};

export default CellItem;
