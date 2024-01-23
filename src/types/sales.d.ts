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
