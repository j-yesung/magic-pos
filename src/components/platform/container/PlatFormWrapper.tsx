import usePlatFormState, { allResetPlatFormState, setIsRegist, setPlatFormStoreId } from '@/shared/store/platform';
import useAuthState from '@/shared/store/session';
import React, { useCallback, useEffect } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import AddButton from './form/button/Button';
import styles from './styles/container.module.css';
const PlatFormWrapper = () => {
  const storeId = useAuthState(state => state.storeId);
  const isRegist = usePlatFormState(state => state.isRegist);
  const clickCloseForm = useCallback(() => setIsRegist(false), []);

  useEffect(() => {
    setPlatFormStoreId(storeId!);
    return () => {
      allResetPlatFormState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.container}>
      <AddButton />
      <Card />
      {isRegist && <Form />}
      {isRegist && <div className={styles.formBg} onClick={clickCloseForm}></div>}
    </div>
  );
};

export default React.memo(PlatFormWrapper);
