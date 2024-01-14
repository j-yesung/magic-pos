import Calendar from '../calendar/Calendar';
import SalesAmount from './salesAmount/SalesAmount';

const SalesDeatilWithCalendar = () => {
  return (
    <div>
      <Calendar>
        <SalesAmount />
      </Calendar>
    </div>
  );
};

export default SalesDeatilWithCalendar;
