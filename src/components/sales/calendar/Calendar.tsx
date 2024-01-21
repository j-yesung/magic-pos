import useSalesStore from '@/shared/store/sales';
import 'moment/locale/ko';
import { Fragment } from 'react';
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
    <div className={isChangeView ? styles.salesStatus : styles.showCalendar}>
      <Header />
      {children}

      {isChangeView ? (
        <Fragment>
          <Days />
          <Cell />
        </Fragment>
      ) : (
        <div className={styles.calendarBorder}>
          <Days />
          <Cell />
        </div>
      )}
    </div>
  );
};

export default Calendar;
