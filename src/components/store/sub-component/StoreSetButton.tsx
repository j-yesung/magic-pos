import { useStoreSetQuery } from '@/hooks/query/store/useStoreSetQuery';
import { useCallback } from 'react';
import Button from '../../common/Button';
import styles from '../styles/StoreContents.module.css';

const StoreSetButton = ({ userId, times }: StoreSetButtonProps) => {
  const { updateStoreTimeSet } = useStoreSetQuery();

  const clickUpdateStoreHandler = useCallback(() => {
    updateStoreTimeSet({ userId, ...times });
  }, [times, updateStoreTimeSet, userId]);

  return (
    <div>
      <Button type="button" onClick={clickUpdateStoreHandler} className={styles.buttonBlankArea}>
        수정
      </Button>
    </div>
  );
};

export default StoreSetButton;
