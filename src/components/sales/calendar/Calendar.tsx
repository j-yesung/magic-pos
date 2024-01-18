import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import 'moment/locale/ko';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';
/**
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */

const Calendar = ({ children }: { children?: React.ReactNode }) => {
  const isChangeView = useSalesStore(state => state.isChangeView);
  return (
    <div className={clsx(isChangeView ? styles.salesStatus : styles.salesCalendar)}>
      <Header />
      {children}
      <Days />
      <Cell />
    </div>
  );
};

export default Calendar;
