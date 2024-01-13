import { getMonthSales } from '@/server/api/supabase/sales';
import useManagementState from '@/shared/store/management';
import { useEffect } from 'react';
import Cell from '../status/tab/calendar/cell/Cell';
import Days from '../status/tab/calendar/days/Days';
import Header from '../status/tab/calendar/header/Header';

const SalesDeatilWithCalendar = () => {
  const {
    date: { currentDate },
  } = useManagementState();
  useEffect(() => {
    getMonthSales(currentDate.clone()).then(data => {
      console.log(data);
    });
  }, []);

  return (
    <div>
      <Header />
      <Days />
      <Cell />
    </div>
  );
};

export default SalesDeatilWithCalendar;
