import Calendar from '../calendar/Calendar';
import { BIG_MODE, CALENDAR_PAGE } from '../calendar/calendarType/calendarType';
import SalesAmount from './salesAmount/SalesAmount';

const SalesCalendar = () => {
  return (
    <Calendar mode={BIG_MODE} page={CALENDAR_PAGE}>
      <SalesAmount />
    </Calendar>
  );
};

export default SalesCalendar;
