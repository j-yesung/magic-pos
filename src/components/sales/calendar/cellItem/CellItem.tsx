import { useModal } from '@/hooks/service/ui/useModal';
import { convertNumberToWon } from '@/shared/helper';
import useCalendarState from '@/shared/store/sales/salesCalendar';
import useDayState from '@/shared/store/sales/salesDay';
import { CalendarDataType, GetMinMaxSalesReturnType, HolidayType } from '@/types/sales';
import { cva } from 'class-variance-authority';
import { Dayjs } from 'dayjs';
import {
  FORMAT_CELL_DATE_TYPE,
  getCalendarDateType,
  getCalendarMonthType,
  getStatusCalendarType,
  getStatusDateType,
  getStatusDayType,
  getStatusMonthType,
} from '../../calendarUtility/cellItemType';
import SalesModal from '../../modal/SalesModal';

import { BIG_MODE, MINI_MODE } from '../calendarType/calendarType';
import styles from './styles/cellItem.module.css';

interface CellItemProps {
  day: Dayjs;
  salesData?: CalendarDataType;
  getMinMaxSalesType?: (param: CalendarDataType) => GetMinMaxSalesReturnType;
  clickShowDataOfDateHandler?: (day: Dayjs) => () => Promise<void>;
  holiday: HolidayType[];
  mode: CalendarModeType;
}

type Cell = (param: CellItemProps) => JSX.Element;

const CellItem: Cell = ({ day, salesData, getMinMaxSalesType, clickShowDataOfDateHandler, holiday, mode }) => {
  const SELECTED_DAY = 'SELECTEDTYPE';
  const SALES_NONE = 'NONE';
  const SALES_HAVE = 'HAVE';
  const HOLIDAY = 'HOLIDAY';
  const currentDate = useCalendarState(staet => staet.currentDate);
  const { selectedDate, today } = useDayState();

  const { MagicModal } = useModal();

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
          className={statusVariant({
            calendarType: getStatusCalendarType(day, currentDate),
            monthType: getStatusMonthType(currentDate, day),
            dateType: getStatusDateType(day),
            holidayType: holiday?.[0]?.name ? HOLIDAY : null,
          })}
          {...((day.isSame(today, 'D') || day.isBefore(today, 'D')) && {
            onClick: clickShowDataOfDateHandler?.(day),
          })}
        >
          <span
            className={statusDayVariant({
              dayType: getStatusDayType(day),
              seletedDayType: day.isSame(selectedDate, 'day') ? SELECTED_DAY : null,
            })}
          >
            {formatDate}
          </span>
        </div>
      )}

      {/* sales/Calendar일 때 보여줄 날 css */}
      {mode === BIG_MODE && (
        <div
          className={calendarVariant({
            monthType: getCalendarMonthType(day, currentDate),
            dateType: getCalendarDateType(day),
            salesType: salesData ? SALES_HAVE : SALES_NONE,
          })}
          {...(day.format(FORMAT_CELL_DATE_TYPE) === salesData?.date && {
            onClick: () => {
              MagicModal.fire(<SalesModal specificData={salesData!} />);
            },
          })}
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
