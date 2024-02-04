import { CalendarDataType, DateFormatType, FormatType, IsTakeOutType, SalesRecordType } from '@/types/sales';
import { Tables, TablesInsert } from '@/types/supabase';
import dayjs, { Dayjs } from 'dayjs';
import { getStartWeeks } from './dateCalculator';

type OrderType = 'togo' | 'store';

type FormatCalendarReturnType = (
  data: Map<string, Tables<'sales'>[]>,
) => { sales: number; date: string; to_go: IsTakeOutType[] | null; store: IsTakeOutType[] | null }[];

type SortMinMaxDataReturnType = (target: CalendarDataType[]) => CalendarDataType[];

type FormatDateParamType = 'YYYY-MM-DD' | 'YYYY년 MM월' | 'YYYY-MM';

type SalesCommonType = TablesInsert<'sales'> & { dayjs?: Dayjs; original_date: Dayjs };

export const formatToCalendarData: FormatCalendarReturnType = data => {
  const refinedData = [...data.entries()].map(([key, value]) => {
    const data = {
      sales: value.reduce((acc, cur) => acc + cur.product_ea * cur.product_price, 0),
      date: key,
      to_go: sortedMainIsTogo(value, 'togo'),
      store: sortedMainIsTogo(value, 'store'),
    };
    return data;
  });

  return refinedData;
};

const sortedMainIsTogo = (main: Tables<'sales'>[], order_type: OrderType) => {
  const sortedMainData = main.filter(order => order.order_type === order_type);

  const sortedCategoryData = sortedSubIsTogo(sortedMainData);
  return sortedCategoryData;
};

const sortedSubIsTogo = (sub: Tables<'sales'>[]) => {
  if (sub.length === 0) return null;

  const groupByMap = new Map<string, Tables<'sales'>[]>();
  sub.forEach(sales => {
    const productName = sales.product_name!;
    const isAlready = groupByMap.has(productName);
    if (isAlready) {
      groupByMap.get(productName)?.push(sales);
    } else {
      groupByMap.set(productName, [sales]);
    }
  });

  const result = [...groupByMap.entries()].map(([key, value]) => {
    const productName = key;
    const salesByGroup = value;
    const summary: IsTakeOutType = {
      product_name: productName,
      product_ea: salesByGroup.reduce((acc, cur) => acc + cur.product_ea, 0),
      product_price: salesByGroup[0].product_price,
      original_data: value,
    };
    return summary;
  });
  return result;
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
 * @param salesData supabase에서 받아온 데이터
 * @param dateType   요일, 주, 월
 * @param selectedDateType  dayjs.Dayjs -나중에 다시한번더 refactoring
 * @param formatType chart의 x축에 보일 년,월,일을 표시해줄 타입
 * @returns
 */

export const formatData = (
  salesData: Tables<'sales'>[],
  dateType: DateFormatType,
  selectedDateType: Dayjs,
  formatType: FormatType,
) => {
  const dateContainer = getDates(dateType, selectedDateType, formatType);
  const groupByDate = getGroupByDate(dateContainer);
  const formattedData = getDataWithFormatingDate(salesData, dateType, formatType);

  const groupBybindingData = insertDataGroupByDate(formattedData, groupByDate);
  const recordData = getRecordData(groupBybindingData, dateType, selectedDateType);

  const result = [...groupBybindingData.entries()]
    .map(([key, value]) => {
      return {
        dayjs: value[0] ? value[0].original_date : dayjs(key).hour(0).minute(0).second(0).add(9, 'hours'),
        x: key,
        y: value.reduce((acc, cur) => acc + cur.product_price! * cur.product_ea!, 0),
      };
    })
    .toSorted((a, b) => (dayjs(a.x).isAfter(dayjs(b.x)) ? 1 : -1));

  return { result, recordData };
};

const getDates = (dateType: DateFormatType, selectedDateType: Dayjs, formatType: FormatDateParamType) => {
  const dateContainer = [];
  if (dateType === 'week') {
    for (let i = 0; i < 7; i++) {
      const month = selectedDateType.subtract(i, dateType);
      const weeksInfoByYear = getStartWeeks(month.year());
      const weeksNumber = month.week();
      const whatMonth = month.month();

      const startWeeksNumber = weeksInfoByYear[whatMonth];
      dateContainer.push(month.format(`${formatType} ${weeksNumber - startWeeksNumber + 1} 주차`));
    }

    return dateContainer;
  } else {
    for (let i = 0; i < 7; i++) {
      dateContainer.push(selectedDateType!.subtract(i, dateType).format(formatType));
    }

    return dateContainer;
  }
};

const getDataWithFormatingDate = (
  originalData: Tables<'sales'>[],
  dateType: DateFormatType,
  formatType: FormatDateParamType,
) => {
  let DataWithFormattedDate;
  if (dateType === 'week') {
    DataWithFormattedDate = originalData.map(data => {
      const dayjsDate = dayjs(data.sales_date).hour(0).minute(0).second(0).add(9, 'hours'); // sales_date는 utc기준시간이므로  우리나라 시간으로 바꾸려면 // 9를 더해준다.
      const weeksInfoByYear = getStartWeeks(dayjsDate.year()); // 전년도 이번년도에서 시작하는 주차가 다르니까
      const weeksNumber = dayjsDate.week(); // w는 일요일기준, W는 월요일기준으로 주차를 결정한다.
      const month = dayjsDate.month(); // 몇월인지
      const startWeeksNumber = weeksInfoByYear[month]; // 각 년도별 월별 주차시작이 들어있는 배열입니다.

      return {
        ...data,
        original_date: dayjsDate,
        sales_date: dayjsDate.format(`${formatType} ${weeksNumber - startWeeksNumber + 1} 주차`),
      };
    });
  } else {
    DataWithFormattedDate = originalData.map(data => ({
      ...data,
      original_date: dayjs(data.sales_date),
      sales_date: dayjs(data.sales_date).format(formatType),
    }));
  }

  return DataWithFormattedDate;
};

const getGroupByDate = (container: string[]) => {
  const mapGroup = new Map<string, SalesCommonType[]>();

  const group = container.reduce((acc, cur) => {
    acc.set(cur, []);
    return acc;
  }, mapGroup);
  return group;
};

const insertDataGroupByDate = (formattedTarget: SalesCommonType[], groupMap: Map<string, SalesCommonType[]>) => {
  formattedTarget.forEach(data => {
    for (const [key] of groupMap) {
      if (key === data.sales_date) {
        groupMap.get(key)?.push(data);
      }
    }
  });
  return groupMap;
};

const getRecordData = (
  toExtracted: Map<string, SalesCommonType[]>,
  dateType: DateFormatType,
  selectedDateType: Dayjs,
): SalesRecordType => {
  const extractedData: SalesRecordType = {
    currentSales: 0,
    dateType: 'day',
  };
  for (const [, value] of toExtracted) {
    if (value.length >= 1) {
      if (selectedDateType.isSame(value[0].original_date, dateType)) {
        extractedData.currentSales = value.reduce((acc, cur) => acc + cur.product_ea! * cur.product_price!, 0);
        break;
      }
    }
  }
  extractedData.dateType = dateType;

  return extractedData;
};
