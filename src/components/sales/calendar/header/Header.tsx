import { useCalendar } from '@/hooks/sales/useCalendar';
import useSalesStore from '@/shared/store/sales';
import styles from './styles/header.module.css';
const Header = () => {
  const {
    date: { currentDate },
  } = useSalesStore();
  const { clickPreMonthHandler, clickNextMonthHandler } = useCalendar();

  return (
    <div className={styles['header']}>
      <div className="wrapper">
        <span className={styles['header-text']}>
          <span className="text-year">{currentDate.clone().format('YYYY년')}</span>
          {currentDate.clone().format('MM월')}
        </span>
      </div>
      <div className={styles['btn-group']}>
        <span onClick={clickPreMonthHandler}>이전</span>
        <span onClick={clickNextMonthHandler}>다음</span>
      </div>
    </div>
  );
};

export default Header;
