import StoreExcel from './storeExcel/StoreExcel';
import styles from './styles/excel.module.css';
import TakeOutExcel from './takeOutExcel/TakeOutExcel';
const Excel = () => {
  return (
    <div className={styles.container}>
      <StoreExcel />
      <TakeOutExcel />
    </div>
  );
};

export default Excel;
