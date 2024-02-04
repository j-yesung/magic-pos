import Calendar from '../calendar/Calendar';
import SalesAmount from './salesAmount/SalesAmount';

const SalesCalendar = () => {
  return (
    <Calendar mode={'big'}>
      <SalesAmount />
    </Calendar>
  );
};

export default SalesCalendar;
