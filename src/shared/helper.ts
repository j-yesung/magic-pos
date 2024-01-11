import { Tables } from '@/types/supabase';
import moment, { Moment } from 'moment';

/**
 * 해당 객체가 빈 객체인지 판단
 * @param obj
 */
export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

/**
 * 숫자를 화폐 형식(원) 문자열로 바꿉니다.
 * @param num
 */
export const convertNumberToWon = (num: number) => {
  return `${new Intl.NumberFormat('ko-KO', { style: 'decimal', currency: 'KRW' }).format(num)}원`;
};

/**
 * 하나 이상의 키를 가지는 객체를 담고 있는 배열을 지정한 키를 기준으로 그룹화하여 객체로 반환합니다.
 * [{name: 'lee', age: 1}, {name: 'lee', age: 10}, {name: 'kim', age: 12}]   => {'lee': [{name: 'lee', age: 1}, {name: 'lee', age: 10}], 'kim': [{name: 'kim', age: 12}]}
 * @param arr 객체의 배열
 * @param key 그룹화의 기준이 될 Key
 */
export const groupByKey = <T extends { [key: string | number]: unknown }>(arr: T[], key: keyof T) => {
  return arr.reduce((acc, cur) => {
    const stringKey = String(cur[key]);
    if (acc.get(stringKey)) acc.get(stringKey)?.push(cur);
    else acc.set(stringKey, [cur]);
    return acc;
  }, new Map<string, T[]>());
};

/**
 *
 * @param date moment객체
 * @param format 변형하고싶은 년도,월,일
 * @returns
 */
export const momentToString = (date: moment.Moment, format: string) => {
  return date.format(format);
};

const getStartWeeks = (year: number) => {
  return new Array(12).fill(false).map((_, index) => moment().year(year).month(index).startOf('months').week());
};

type DateFormatType = 'days' | 'weeks' | 'months';

export const formatData = (salesData: Tables<'sales'>[], formatType?: DateFormatType) => {
  if (salesData && formatType) {
    if (formatType === 'days') {
      // 일별로 데이터를 추출
      const group = groupByKey<Tables<'sales'>>(
        salesData.map(data => ({ ...data, sales_date: moment(data.sales_date).format('YYYY-MM-DD') })),
        'sales_date',
      );

      const result = [...group.entries()]
        .map(([key, value]) => {
          return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price!, 0) };
        })
        .toSorted((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

      return result;
    } else if (formatType === 'weeks') {
      // 주별로 데이터를 추출

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

      const group = groupByKey<Tables<'sales'> & { original_sales_date: Moment }>(newData, 'sales_date');

      const result = [...group.entries()]
        .map(([key, value]) => {
          return {
            moment: value[0].original_sales_date,
            x: key,
            y: value.reduce((acc, cur) => acc + cur.product_price!, 0),
          };
        })
        .sort((a, b) => (moment(a.moment).isAfter(moment(b.moment)) ? 1 : -1));

      return result;
    } else if (formatType === 'months') {
      // 월별로 데이터를 추출

      const group = groupByKey<Tables<'sales'>>(
        salesData.map(data => ({ ...data, sales_date: moment(data.sales_date).format('YYYY-MM') })),
        'sales_date',
      );

      const result = [...group.entries()]
        .map(([key, value]) => {
          return { x: key, y: value.reduce((acc, cur) => acc + cur.product_price!, 0) };
        })
        .sort((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

      return result;
    }
    return [];
  }
};
