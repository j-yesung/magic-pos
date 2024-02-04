/**
 * DateFormatType은  데이터를 가공할 때 사용합니다.
 */
export type DateFormatType = 'day' | 'week' | 'month';
/**
 *  FORMAT_DAY_TYPE = 'YYYY-MM-DD';
 * FORMAT_WEEK_TYPE = 'YYYY년 MM월';
 * FORMAT_MONTHS_TYPE = 'YYYY-MM';
 */
export type FormatType = 'YYYY-MM-DD' | 'YYYY년 MM월' | 'YYYY-MM';

/**
 * 매출달력 일때
 */
export interface CalendarDataType {
  sales: number;
  date: string;
  min?: boolean;
  max?: boolean;
  to_go: IsTakeOutType[] | null;
  store: IsTakeOutType[] | null;
}

/**
 *  매출 달력 컴포넌트가 보일때
 */
export type GetMinMaxSalesReturnType = 'MAX' | 'MIN' | undefined;

export interface SalesDataReturnType {
  sales: Tables<'sales'>[];
  error?: PostgrestError;
  dateType: DateFormatType;
  formatType?: FormatType;
}

export type SalesRecordType = {
  currentSales: number;
  dateType: 'day' | 'month' | 'week';
};

export interface IsTakeOutType {
  product_name: string;
  product_ea: number;
  product_price: number;
  original_data: Tables<'sales'>[];
}

/**
 *  매출 달력에서 모달 닫기
 */

export interface CloseModalType {
  clickCloseModal: () => void;
}

/**
 * SSG
 *   "holidayNumber": "2",
  "date": "01월 21일(토)",
  "name": "설날 연휴",
  "anniversary": ""
 */
export interface HolidayType {
  holidayNumber: string;
  date: string;
  name: string;
  anniversary: string;
}

/**
 * 각 해 휴일을 담는 객체
 */
export interface HolidaysType {
  [key: string]: HolidayType[];
}

/**
 * EXCEL 데이터 객체
 */
export interface ExcelData {
  order_type: string;
  product_name: string;
  product_price: number;
  product_ea: number;
  sum: number;
  sales_date: string;
}

export interface SalesAllReturnType {
  sales: Tables<'sales'>[];
  error?: PostgrestError;
  orderType: KoOrderType;
}

export type KoOrderType = '매장' | '포장';
export type EnOrderType = 'togo' | 'store';
