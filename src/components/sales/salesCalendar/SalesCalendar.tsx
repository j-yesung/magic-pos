import { getMonthSales } from '@/server/api/supabase/sales';
import useManagementState from '@/shared/store/management';
import { useEffect } from 'react';
import Header from '../status/tab/calendar/header/Header';

const SalesCalendar = () => {
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
    </div>
  );
};

export default SalesCalendar;
