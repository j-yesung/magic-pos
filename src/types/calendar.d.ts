import { Dayjs } from 'dayjs';
import { CalendarDataType } from './sales';

type CalendarModeType = 'MINI_MODE' | 'BIG_MODE';
type CalendarPageType = 'STATUS_PAGE' | 'CALENDAR_PAGE' | 'ORDER_START_PAGE' | 'ORDER_END_PAGE';

// Calendar Component
interface CalendarType {
  children?: React.ReactNode;
  mode: CalendarModeType;
  page: CalendarPageType;
}

interface CalendarCellType {
  mode: CalendarModeType;
  page: CalendarPageType;
  clickShowDataOfDateHandler?: (e: MouseEvent<HTMLDivElement>) => Promise<void>;
  clickShowSalesModal?: (e: MouseEvent<HTMLDivElement>) => CalendarDataType | null;
}

/**
 * Cell -> CellItem에서 기본적으로 내려주는 props 입니다.
 * CellItem에서 click 이벤트 조건부 및 달력의 날짜의 css처리를 합니다.
 * 여기에 type을 추가하시면 됩니다.
 */
interface CellItemProps {
  day: Dayjs;
  salesData?: CalendarDataType;
  getMinMaxSalesType?: (param: CalendarDataType) => GetMinMaxSalesReturnType;
  holiday: HolidayType[];
  mode: CalendarModeType;
  page: CalendarPageType;
  id: string;
  // order-check-list 에서 사용하는 함수
  clickStartTimeHandler?: (day: Dayjs) => () => void;
  clickEndTimeHandler?: (day: Dayjs) => () => void;
}
