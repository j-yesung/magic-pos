import { HolidayType } from '@/types/sales';
import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import { FORMAT_CELL_DATE_TYPE } from './cellItemType';

/**
 * Sales의 index에서 getStaticProps에서 사용하는 함수
 * @param data
 * @returns HolidayType[]
 */
export const processHoldayList = (data: string, year: string) => {
  const $ = cheerio.load(data);
  const holidayElement = $('.result table tr');
  const holidays: HolidayType[] = [];

  holidayElement.each((idx, el) => {
    if (idx !== 0) {
      const col = $(el).find('td');
      const holidayNumber = col.eq(0).text().trim();
      const date = col.eq(1).text().trim();
      const name = col.eq(2).text().trim();
      const anniversary = col.eq(3).text().trim();

      holidays.push({ holidayNumber, date, name, anniversary });
    }
  });

  const formattedHolidays = removeBracketHolidayList(holidays, year);

  return formattedHolidays;
};
const removeBracketHolidayList = (list: HolidayType[], year: string) => {
  return list.map(holiday => {
    const cleanName = holiday.name.replace(/\(.*\)/g, '').trim();
    const cleanDate = holiday.date.replace(/\(.*\)/g, '').trim();

    const modifyingDate = cleanDate.replace(/[월일]/g, ''); // dayjs로 바로 안바껴서 한번 modifying해야합니다.
    const formattedDayjsDate = dayjs(`${year} ${modifyingDate} `).format(FORMAT_CELL_DATE_TYPE);

    return {
      ...holiday,
      date: formattedDayjsDate,
      name: cleanName,
    };
  });
};
