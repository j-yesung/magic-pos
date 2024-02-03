import useSalesToggle from '@/shared/store/sales/salesToggle';
import SalesCalendar from './salesCalendar/SalesCalendar';
import SalesStatus from './status/SalesStatus';
import styles from './styles/sales.module.css';
import Toggle from './toggle/Toggle';

const Sales = () => {
  const isChangeView = useSalesToggle(state => state.isChangeView);
  return (
    <div className={styles.salesContainer}>
      <Toggle />
      {isChangeView ? <SalesStatus /> : <SalesCalendar />}
    </div>
  );
};

export default Sales;
