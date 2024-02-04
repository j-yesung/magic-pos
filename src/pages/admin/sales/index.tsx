import AdminLayout from '@/components/layout/admin/AdminLayout';
import Sales from '@/components/sales/Sales';
import { processHoldayList } from '@/components/sales/calendarUtility/formatHoliday';
import { makeTitle } from '@/shared/helper';
import { setHolidayState } from '@/shared/store/sales/salesHoliday';
import { HolidayType, HolidaysType } from '@/types/sales';
import axios from 'axios';
import dayjs from 'dayjs';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { ReactNode } from 'react';

export const getStaticProps = (async () => {
  const startYearOfHoliday = 2000;
  const holidayObject: { [key: string]: HolidayType[] } = {};

  // 2000년부터 2030년까지
  for (let i = 0; i <= 30; i++) {
    const holidayYear = dayjs().year(startYearOfHoliday).add(i, 'year').format('YYYY');
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOLIDAY_URL}/${holidayYear}`);
    const holidayList = processHoldayList(data, holidayYear);
    holidayObject[holidayYear] = holidayList;
  }

  return { props: { holidays: holidayObject } };
}) satisfies GetStaticProps<{
  holidays: HolidaysType;
}>;

const SalesPage = ({ holidays }: { holidays: HolidaysType }) => {
  setHolidayState(holidays);
  return (
    <>
      <Head>
        <title>{makeTitle('매출 관리')}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="매직 포스" />
        <meta name="keywords" content="magic pos,매직 포스, 키오스크, 매출관리, 달력으로매출 관리, 차트로 매출관리" />
        <meta name="description" content="magic pos의 매출 관리 페이지 입니다. " />
      </Head>
      <Sales />
    </>
  );
};
SalesPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default SalesPage;
