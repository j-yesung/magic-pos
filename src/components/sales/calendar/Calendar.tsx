import useSalesToggle from '@/shared/store/sales/salesToggle';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';

const Calendar = ({ children }: { children?: React.ReactNode }) => {
  const isChangeView = useSalesToggle(state => state.isChangeView);

  return (
    <div className={isChangeView ? styles.salesStatus : styles.showCalendar}>
      <div className={isChangeView ? styles.statusHeaderWrapper : styles.calendarHeaderWrapper}>
        <Header />
        {children}
      </div>

      <div className={!isChangeView ? styles.calendarBodyWrapper : ''}>
        <Days />
        <Cell />
      </div>
    </div>
  );
};

export default Calendar;
