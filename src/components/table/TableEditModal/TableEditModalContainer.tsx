import useTableStore from '@/shared/store/table';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './styles/TableEditModalContainer.module.css';

const TableEditModalContainer = () => {
  const [isDisabledState, setIsDisabledState] = useState(false);
  const { tableNumber, maxGuest, setMaxGuest, setIsDisabled } = useTableStore();

  const clickMaxGuestHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value <= 1) {
      setMaxGuest(1);
    } else {
      setMaxGuest(+e.target.value);
    }
  };
  useEffect(() => {
    setIsDisabled(isDisabledState ? 0 : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabledState]);

  return (
    <div className={styles['modal-container']}>
      <div className={styles['table-name-box']}>
        <div className={styles['table-name-title']}>테이블 이름</div>
        <div className={styles['table-name-content']}>테이블 {tableNumber}</div>
      </div>
      <div className={styles['table-max-gest-box']}>
        <div className={styles['table-max-gest-title']}>최대 인원 수</div>
        <input
          type="number"
          className={styles['table-max-gest-content']}
          value={maxGuest ?? 0}
          onChange={clickMaxGuestHandler}
        />
      </div>
      <div className={styles['table-disabled-box']}>
        <div className={styles['table-disabled-title']}>사용여부</div>
        <div
          className={clsx(styles['table-disabled-content'], !isDisabledState && styles['table-is-disabled'])}
          onClick={() => {
            setIsDisabledState(!isDisabledState);
          }}
        >
          <span className={styles['isDisabled-name']}>{isDisabledState ? '사용' : '미사용'}</span>
          <div className={styles['isDisabled-button']}></div>
        </div>
      </div>
    </div>
  );
};

export default TableEditModalContainer;
