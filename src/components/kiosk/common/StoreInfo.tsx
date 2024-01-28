import styles from './style/StoreInfo.module.css';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

interface StoreInfoProps {
  orderType: OrderType;
  storeName: string;
  className?: string;
  amount?: number;
}

const StoreInfo = ({ orderType, storeName, className, amount }: StoreInfoProps) => {
  const { t } = useTranslation();

  return (
    <div className={clsx(styles.storeInfo, className)}>
      <div className={styles.wrapper}>
        <div className={styles.orderType}>
          <span>{orderType.type === 'togo' ? t('order-type.togo-short') : t('order-type.store-short')}</span>
        </div>
        <span className={styles.storeName}>{storeName}</span>
      </div>
      {amount && <div className={styles.amount}>{amount}</div>}
    </div>
  );
};

export default StoreInfo;
