import useDayState from '@/shared/store/sales/salesDay';
import useAuthState from '@/shared/store/session';
import StoreExcel from './storeExcel/StoreExcel';
import styles from './styles/excel.module.css';
import TakeOutExcel from './takeOutExcel/TakeOutExcel';

const Excel = () => {
  const today = useDayState(state => state.today);
  const storeId = useAuthState(state => state.storeId);

  return (
    <div className={styles.container}>
      <StoreExcel today={today} storeId={storeId!} />
      <TakeOutExcel today={today} storeId={storeId!} />
    </div>
  );
};

export default Excel;
