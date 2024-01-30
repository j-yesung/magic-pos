import usePlatFormState, {
  resetIsEditMode,
  resetIsRegist,
  resetPrevData,
  resetPrevImg,
  setIsRegist,
  setPlatFormStoreId,
} from '@/shared/store/platform';
import useAuthState from '@/shared/store/session';
import { useEffect } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import AddButton from './form/button/Button';
import styles from './styles/container.module.css';
const PlatFormWrapper = () => {
  const storeId = useAuthState(state => state.storeId);
  setPlatFormStoreId(storeId!);
  const isRegist = usePlatFormState(state => state.isRegist);
  const clickCloseForm = () => setIsRegist(false);
  useEffect(() => {
    try {
      console.log(new URL('https://www.naver.c'));
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    return () => {
      resetIsRegist();
      resetIsEditMode();
      resetPrevData();
      resetPrevImg();
      resetIsEditMode();
    };
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

export default PlatFormWrapper;
