import Button from '@/components/common/Button';
import useSalesStore from '@/shared/store/sales/sales';
import clsx from 'clsx';
import styles from './styles/toggleButton.module.css';

const ToggleButton = () => {
  const { isChangeView, setIsChangeView } = useSalesStore();

  const clickShowChart = () => setIsChangeView(true);
  const clickShowCalendar = () => setIsChangeView(false);
  return (
    <div className={styles.toggleBtnWrapper}>
      <Button
        className={clsx(styles.toggleButton, { [styles.clickedToggle]: isChangeView })}
        type="button"
        onClick={clickShowChart}
      >
        매출관리
      </Button>

      <Button
        className={clsx(styles.toggleButton, { [styles.clickedToggle]: !isChangeView })}
        onClick={clickShowCalendar}
        type="button"
      >
        매출 달력
      </Button>
    </div>
  );
};

export default ToggleButton;
