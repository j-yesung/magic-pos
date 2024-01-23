import { DateFormatType, FormatType } from '@/server/api/supabase/sales';
import { Tables, TablesInsert } from '@/types/supabase';
import moment, { Moment } from 'moment';
import { CalendarDataType } from '../calendar/cell/Cell';
import { getStartWeeks } from './dateCalculator';
type FormatCalendarReturnType = (data: Map<string, Tables<'sales'>[]>) => { sales: number; date: string }[];
type SortMinMaxDataReturnType = (target: CalendarDataType[]) => CalendarDataType[];
type FormatDateParamType = 'YYYY-MM-DD' | 'YYYY년 MM월' | 'YYYY-MM';
type DateParamType = 'day' | 'week' | 'month';

type CommonType = TablesInsert<'sales'> & { moment?: Moment; original_date: Moment };

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
 * @param salesData supabase에서 받아온 데이터
 * @param dateType   요일, 주, 월
 * @param selectedDateType  moment.Moment -나중에 다시한번더 refactoring
 * @param formatType chart의 x축에 보일 년,월,일을 표시해줄 타입
 * @returns
 */

export const formatData = (
  salesData: Tables<'sales'>[],
  dateType: DateFormatType,
  selectedDateType: Moment,
  formatType: FormatType,
) => {
  console.log(dateType);
  const dateContainer = getDates(dateType, selectedDateType, formatType);
  const dateGroup = createGroupByMap();
  const groupByDate = getGroupByDate(dateContainer, dateGroup);
  const formattedData = getDataWithFormatingDate(salesData, dateType, formatType);

  const groupBybindingData = insertDataGroupByDate(formattedData, groupByDate);
  const recordData = getRecordData(groupBybindingData, dateType, selectedDateType);

  const result = [...groupBybindingData.entries()]
    .map(([key, value]) => {
      return {
        moment: value[0] ? value[0].original_date : moment(key).hour(0).minute(0).second(0).add(9, 'hours'),
        x: key,
        y: value.reduce((acc, cur) => acc + cur.product_price! * cur.product_ea!, 0),
      };
    })
    .toSorted((a, b) => (moment(a.x).isAfter(moment(b.x)) ? 1 : -1));

  return { result, recordData };
};

const getDates = (dateType: DateParamType, selectedDateType: Moment, formatType: FormatDateParamType) => {
  const dateContainer = [];
  if (dateType === 'week') {
    for (let i = 0; i < 7; i++) {
      const month = selectedDateType!.clone().subtract(i, dateType);
      const weeksInfoByYear = getStartWeeks(month.year());
      const weeksNumber = +month.format('W');
      const whatMonth = month.month();
      const startWeeksNumber = weeksInfoByYear[whatMonth];
      dateContainer.push(month.format(`${formatType} ${weeksNumber - startWeeksNumber + 1} 주차`));
    }

    return dateContainer;
  } else {
    for (let i = 0; i < 7; i++) {
      dateContainer.push(selectedDateType!.clone().subtract(i, dateType).format(formatType));
    }

    return dateContainer;
  }
};

const getDataWithFormatingDate = (
  originalData: Tables<'sales'>[],
  dateType: DateParamType,
  formatType: FormatDateParamType,
) => {
  let DataWithFormattedDate;
  if (dateType === 'week') {
    DataWithFormattedDate = originalData.map(data => {
      const momentDate = moment(data.sales_date).hour(0).minute(0).second(0).add(9, 'hours'); // sales_date는 utc기준시간이므로  우리나라 시간으로 바꾸려면 // 9를 더해준다.
      const weeksInfoByYear = getStartWeeks(momentDate.year()); // 전년도 이번년도에서 시작하는 주차가 다르니까
      const weeksNumber = +momentDate.format('W'); // w는 일요일기준, W는 월요일기준으로 주차를 결정한다.

      const month = momentDate.month(); // 몇월인지
      const startWeeksNumber = weeksInfoByYear[month]; // 각 년도별 월별 주차시작이 들어있는 배열입니다.

      return {
        ...data,
        original_date: momentDate,
        sales_date: momentDate.format(`${formatType} ${weeksNumber - startWeeksNumber + 1} 주차`),
      };
    });
  } else {
    DataWithFormattedDate = originalData.map(data => ({
      ...data,
      original_date: moment(data.sales_date),
      sales_date: moment(data.sales_date).format(formatType),
    }));
  }

  return DataWithFormattedDate;
};

const createGroupByMap = () => {
  const mapGroup = new Map<string, CommonType[]>();
  return mapGroup;
};

const getGroupByDate = (container: string[], map: Map<string, CommonType[]>) => {
  const group = container.reduce((acc, cur) => {
    acc.set(cur, []);
    return acc;
  }, map);
  return group;
};

const insertDataGroupByDate = (formattedTarget: CommonType[], groupMap: Map<string, CommonType[]>) => {
  formattedTarget.forEach(data => {
    for (const [key, _] of groupMap) {
      if (key === data.sales_date) {
        groupMap.get(key)?.push(data);
      }
    }
  });
  return groupMap;
};

const getRecordData = (toExtracted: Map<string, CommonType[]>, dateType: DateParamType, selectedDateType: Moment) => {
  const extractedData = {
    currentSales: 0,
    dateType: '',
  };
  for (const [_, value] of toExtracted) {
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
