import styles from './styles/ReceiptOrderHeader.module.css';
import clsx from 'clsx';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface ReceiptHeaderProps {
  orderNumber: number;
  isTogo: boolean;
  isDone: boolean;
  orderTime: string;
}

const ReceiptOrderHeader = ({ isTogo, orderNumber, isDone, orderTime }: ReceiptHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.orderNumberWrapper}>
        {isDone ? (
          <div className={clsx(styles.ready, styles.readyBox)}>{t('complete')}</div>
        ) : (
          <div className={clsx(styles.readyBox, styles.notReady)}>{t('preparing')}</div>
        )}

        <span className={styles.orderNumber}>
          {t('order-number')} {orderNumber}
        </span>
      </div>

      <div className={styles.timeWrapper}>
        <span className={styles.orderTime}>
          {t('order-time')} {moment(orderTime).format('HH:mm')}
        </span>
        <span className={styles.orderType}>{isTogo ? t('order-type.store-short') : t('order-type.togo-short')}</span>
      </div>
    </div>
  );
};

export default ReceiptOrderHeader;
