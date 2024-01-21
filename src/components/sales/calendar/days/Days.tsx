import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import styles from './styles/days.module.css';
const Days = () => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const isChangeView = useSalesStore(state => state.isChangeView);
  return (
    <div className={clsx(styles.days, !isChangeView && styles.calendarDays)}>
      {days.map((day, idx) => (
        <span key={day + idx} className={clsx(styles.day, !isChangeView && styles.calendarDay)}>
          {day}
        </span>
      ))}
    </div>
  );
};

export default Days;
