import { DateFormatType } from '@/server/api/supabase/sales';
import { Tables, TablesInsert } from '@/types/supabase';
import moment, { Moment } from 'moment';
import { CalendarDataType } from '../calendar/cell/Cell';
import { getStartWeeks } from './dateCalculator';
type FormatCalendarReturnType = (data: Map<string, Tables<'sales'>[]>) => { sales: number; date: string }[];
type SortMinMaxDataReturnType = (target: CalendarDataType[]) => CalendarDataType[];

export const formatToCalendarData: FormatCalendarReturnType = data => {
  const refinedData = [...data.entries()].map(([key, value]) => {
    const data = {
      sales: value.reduce((acc, cur) => acc + cur.product_ea * cur.product_price, 0),
      date: key,
    };
    return data;
  });
  return refinedData;
};

export const sortMinMaxData: SortMinMaxDataReturnType = target => {
  const sortedData = target.toSorted((min, max) => (min.sales < max.sales ? 1 : -1));
  if (sortedData.length > 1) {
    sortedData[0].max = true;
    sortedData[target.length - 1].min = true;
  }
  if (sortedData.length === 1) {
    sortedData[0].max = true;
  }
  return sortedData;
};

/**
 *
 * @param salesData salesTable에서 조건부로 받아온 데이터
 * @param formatType 'days', 'weeks' , 'months' 를 받습니다.
 * @returns  { x: string, y: number, moment?:Moment}[]
 */
export const formatData = (salesData: Tables<'sales'>[], formatType?: DateFormatType, selectedDateType?: Moment) => {
  if (salesData && formatType) {
    const recordData = {
      currentSales: 0,
      dateType: '',
    };
    if (formatType === 'days') {
      // 일별로 데이터를 추출
      const dateContainer = [];
      for (let i = 0; i < 7; i++) {
        dateContainer.push(selectedDateType!.clone().subtract(i, 'day').format('YYYY-MM-DD'));
      }
      const dateGroup = new Map<string, Tables<'sales'>[]>();
      const groupByDate = dateContainer.reduce((acc, cur) => {
        acc.set(cur, []);
        return acc;
      }, dateGroup);

      const formattedData = salesData.map(data => ({
        ...data,
        original_date: data.sales_date,
        sales_date: moment(data.sales_date).format('YYYY-MM-DD'),
      }));

      formattedData.forEach(data => {
        for (const [key, _] of groupByDate) {
          if (key === data.sales_date) {
            dateGroup.get(key)?.push(data);
          }
        }
      });

      for (const [key, value] of groupByDate) {
        if (selectedDateType?.format('YYYY-MM-DD') === key) {
          recordData.currentSales = value.reduce((acc, cur) => acc + cur.product_ea * cur.product_price, 0);
        }
      }
      recordData.dateType = 'days';

      const result = [...groupByDate.entries()]
        .map(([key, value]) => {
          return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price * cur.product_ea, 0) };
        })
        .toSorted((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));
      return { result, recordData };
    } else if (formatType === 'weeks') {
      // 주별로 데이터를 추출
      const test = moment();
      const dateContainer = [];
      for (let i = 0; i < 7; i++) {
        const month = test.clone().subtract(i, 'week');
        const weeksInfoByYear = getStartWeeks(month.year());
        const weeksNumber = +month.format('W');
        const whatMonth = month.month();
        const startWeeksNumber = weeksInfoByYear[whatMonth];
        dateContainer.push(month.format(`YYYY년 MM월 ${weeksNumber - startWeeksNumber + 1} 주차`));
      }

      const dateGroup = new Map<
        string,
        (TablesInsert<'sales'> & { moment?: Moment; original_sales_date?: Moment })[]
      >();

      const groupByDate = dateContainer.reduce((acc, cur) => {
        acc.set(cur, []);
        return acc;
      }, dateGroup);

      const newData = salesData.map(sales => {
        const momentDate = moment(sales.sales_date).hour(0).minute(0).second(0).add(9, 'hours'); // sales_date는 utc기준시간이므로  우리나라 시간으로 바꾸려면 // 9를 더해준다.
        const weeksInfoByYear = getStartWeeks(momentDate.year()); // 전년도 이번년도에서 시작하는 주차가 다르니까
        const weeksNumber = +momentDate.format('W'); // w는 일요일기준, W는 월요일기준으로 주차를 결정한다.

        const month = momentDate.month(); // 몇월인지
        const startWeeksNumber = weeksInfoByYear[month]; // 각 년도별 월별 주차시작이 들어있는 배열입니다.

        return {
          ...sales,
          original_sales_date: momentDate,
          sales_date: momentDate.format(`YYYY년 MM월 ${weeksNumber - startWeeksNumber + 1} 주차`),
        };
      });

      newData.forEach(data => {
        for (const [key, _] of groupByDate) {
          if (key === data.sales_date) {
            groupByDate.get(key)?.push(data);
          }
        }
      });

      for (const [, value] of groupByDate) {
        if (value.length >= 1) {
          if (moment().isSame(value[0].original_sales_date, 'weeks')) {
            recordData.currentSales = value.reduce((acc, cur) => acc + cur.product_ea! * cur.product_price!, 0);
            break;
          }
        }
      }
      recordData.dateType = 'weeks';
      const result = [...groupByDate.entries()]
        .map(([key, value]) => {
          return {
            moment: value[0] ? value[0].original_sales_date : moment(key).hour(0).minute(0).second(0).add(9, 'hours'),
            x: key,
            y: value.length >= 1 ? value.reduce((acc, cur) => acc + cur.product_price! * cur.product_ea!, 0) : 0,
          };
        })
        .toSorted((a, b) => (moment(a.moment).isAfter(moment(b.moment)) ? 1 : -1));

      return { result, recordData };
    } else if (formatType === 'months') {
      // 월별로 데이터를 추출
      const test = moment();
      const testArr = [];
      for (let i = 0; i < 7; i++) {
        testArr.push(test.clone().subtract(i, 'month').format('YYYY-MM'));
      }
      const m = new Map<string, Tables<'sales'>[]>();
      const a = testArr.reduce((acc, cur) => {
        acc.set(cur, []);
        return acc;
      }, m);
      const t = salesData.map(data => ({
        ...data,
        original_date: data.sales_date,
        sales_date: moment(data.sales_date).format('YYYY-MM'),
      }));
      t.forEach(data => {
        for (const [key, value] of a) {
          if (key === data.sales_date) {
            a.get(key)?.push(data);
          }
        }
      });

      for (const [key, value] of a) {
        if (moment().format('YYYY-MM') === key) {
          recordData.currentSales = value.reduce((acc, cur) => acc + cur.product_ea * cur.product_price, 0);
        }
      }
      recordData.dateType = 'month';

      const result = [...a.entries()]
        .map(([key, value]) => {
          return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price * cur.product_ea, 0) };
        })
        .toSorted((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

      return { result, recordData };
    }
  }
  return { result: null, recordData: null };
};
