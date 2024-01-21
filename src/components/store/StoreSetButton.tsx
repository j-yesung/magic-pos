import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import { useCallback } from 'react';
import Button from '../common/Button';
import { TimeState } from './StoreTimeSet';
import styles from './styles/StroeContents.module.css';

interface StoreSetButtonProps {
  userId: string;
  times: TimeState;
}

const StoreSetButton = ({ userId, times }: StoreSetButtonProps) => {
  const { updateStoreTimeSet } = useStoreQuery();

  // DB 영업시간 변경
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
