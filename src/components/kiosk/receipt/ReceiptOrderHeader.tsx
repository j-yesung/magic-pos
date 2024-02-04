import clsx from 'clsx';
import dayjs from 'dayjs';
import { useTranslation } from 'next-i18next';
import styles from './styles/ReceiptOrderHeader.module.css';

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
          <div className={clsx(styles.readyBox, styles.ready)}>{t('complete')}</div>
        ) : (
          <div className={clsx(styles.readyBox, styles.notReady)}>{t('prepare')}</div>
        )}

        <span className={styles.orderNumber}>
          {t('order-number')} {orderNumber}
        </span>
      </div>

      <div className={styles.timeWrapper}>
        <span className={styles.orderTime}>
          {t('order-time')} {dayjs(orderTime).format('HH:mm')}
        </span>
        <span className={styles.orderType}>{isTogo ? t('order-type.togo-short') : t('order-type.store-short')}</span>
      </div>
    </div>
  );
};

export default ReceiptOrderHeader;
