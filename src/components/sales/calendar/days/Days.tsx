import useSalesStore from '@/shared/store/sales';
import styles from './styles/days.module.css';
const Days = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const isChangeView = useSalesStore(state => state.isChangeView);
  return (
    <div className={isChangeView ? styles.statusDays : styles.salesCalendarDays}>
      {days.map((day, idx) => (
        <span key={day + idx} className={isChangeView ? styles.statusDay : styles.salesCalendarDay}>
          {day}
        </span>
      ))}
    </div>
  );
};

export default Days;
