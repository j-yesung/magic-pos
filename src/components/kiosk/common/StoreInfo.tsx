import styles from './style/StoreInfo.module.css';
import clsx from 'clsx';

interface StoreInfoProps {
  orderType: OrderType;
  storeName: string;
  className?: string;
  amount?: number;
}

const StoreInfo = ({ orderType, storeName, className, amount }: StoreInfoProps) => {
  return (
    <div className={clsx(styles.storeInfo, className)}>
      <div className={styles.wrapper}>
        <div className={styles.orderType}>
          <span>{orderType.type === 'togo' ? '포장' : '매장'}</span>
        </div>
        <span className={styles.storeName}>{storeName}</span>
      </div>
      {amount && <div className={styles.amount}>{amount}</div>}
    </div>
  );
};

export default StoreInfo;
