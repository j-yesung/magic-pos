import useSalesStore from '@/shared/store/sales';
import SalesDeatilWithCalendar from './salesCalendar/SalesDetailWithCalendar';
import Status from './status/Status';
import styles from './styles/sales.module.css';
import Toggle from './toggle/Toggle';

const Sales = () => {
  const isChangeView = useSalesStore(state => state.isChangeView);

  return (
    <div className={styles.salesContainer}>
      <Toggle />
      {isChangeView ? <Status /> : <SalesDeatilWithCalendar />}
    </div>
  );
};

export default Sales;
