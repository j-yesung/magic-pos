import useManagementState from '@/shared/store/management';
import 'moment/locale/ko';
import Cell from './cell/Cell';
import Days from './days/Days';
import Header from './header/Header';
import styles from './styles/calendar.module.css';
/**
 * @example clone()을 해준 이유는 원본을 훼손하지 않기 위해서입니다.
 */

const Calendar = () => {
  const { isShow } = useManagementState();

  return (
    <div className={isShow ? styles['show-calendar'] : styles['hidden-calendar']}>
      <Header />
      <Days />
      <Cell />
    </div>
  );
};

export default Calendar;
