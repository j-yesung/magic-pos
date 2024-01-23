import useSalesStore from '@/shared/store/sales';
import clsx from 'clsx';
import styles from './styles/headerDate.module.css';
const HeaderDate = () => {
  const {
    isChangeView,
    date: { currentDate },
  } = useSalesStore();
  return (
    <div className="wrapper">
      <span className={clsx(styles.headerText, !isChangeView && styles.calendarHeaderText)}>
        <span className={clsx(styles.textYear, !isChangeView && styles.calendarTextYear)}>
          {currentDate.clone().format('YYYY년')}
        </span>
        {currentDate.clone().format('MM월')}
      </span>
    </div>
  );
};

export default HeaderDate;
