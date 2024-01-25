import useSalesToggle from '@/shared/store/sales/salesToggle';
import styles from './styles/days.module.css';
const Days = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const isChangeView = useSalesToggle(state => state.isChangeView);
  return (
    <div className={isChangeView ? styles.statusDays : styles.salesCalendarDays}>
      {days.map((day, idx) => (
        <span key={day + idx} className={isChangeView ? styles.statusDay : styles.salesCalendarDay}>
          <span className={isChangeView ? styles.statusDayText : ''}>{day}</span>
        </span>
      ))}
    </div>
  );
};

export default Days;
