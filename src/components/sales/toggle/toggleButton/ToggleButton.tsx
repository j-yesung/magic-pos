import Button from '@/components/common/Button';
import useSalesToggle, { setIsChangeView } from '@/shared/store/sales/salesToggle';
import clsx from 'clsx';
import React, { useCallback } from 'react';
import styles from './styles/toggleButton.module.css';

const ToggleButton = () => {
  const isChangeView = useSalesToggle(state => state.isChangeView);

  const clickShowChart = useCallback(() => setIsChangeView(true), []);
  const clickShowCalendar = useCallback(() => setIsChangeView(false), []);
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

export default React.memo(ToggleButton);
