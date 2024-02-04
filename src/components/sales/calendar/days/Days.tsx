import useSalesToggle from '@/shared/store/sales/salesToggle';
import clsx from 'clsx';
import styles from './styles/days.module.css';
const DAYS = ['일', '월', '화', '수', '목', '금', '토'];

const Days = ({ mode }: { mode: 'mini' | 'big' }) => {
  const isChangeView = useSalesToggle(state => state.isChangeView);
  return (
    <div
      className={clsx({
        [styles.statusDays]: mode === 'mini',
        [styles.salesCalendarDays]: mode === 'big',
      })}
    >
      {DAYS.map((day, idx) => (
        <span
          key={day + idx}
          className={clsx({
            [styles.statusDay]: mode === 'mini',
            [styles.salesCalendarDay]: mode === 'big',
          })}
        >
          <span className={clsx(mode === 'mini' && styles.statusDayText)}>{day}</span>
        </span>
      ))}
    </div>
  );
};

export default Days;
