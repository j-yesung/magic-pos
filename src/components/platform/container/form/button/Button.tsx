import Button from '@/components/common/Button';
import { setIsRegist } from '@/shared/store/platform';
import React, { useCallback } from 'react';
import styles from './styles/button.module.css';
const AddButton = () => {
  const clickShowAddForm = useCallback(() => setIsRegist(true), []);
  return (
    <div className={styles.buttonContainer}>
      <Button type="button" className={styles.button} onClick={clickShowAddForm}>
        추가
      </Button>
    </div>
  );
};

export default React.memo(AddButton);
