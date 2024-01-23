import styles from './styles/ReceiptOrderHeader.module.css';
import clsx from 'clsx';
import moment from 'moment';

interface ReceiptHeaderProps {
  orderNumber: number;
  isTogo: boolean;
  isDone: boolean;
  orderTime: string;
}

const ReceiptOrderHeader = ({ isTogo, orderNumber, isDone, orderTime }: ReceiptHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.orderNumberWrapper}>
        {isDone ? (
          <div className={clsx(styles.ready, styles.readyBox)}>완료</div>
        ) : (
          <div className={clsx(styles.readyBox, styles.notReady)}>준비중</div>
        )}

        <span className={styles.orderNumber}>주문 번호 {orderNumber}</span>
      </div>
      <span className={styles.orderTime}>주문 시간 {moment(orderTime).format('HH:mm')}</span>

      <div className={clsx(styles.orderType)}>
        <span>{isTogo ? '포장' : '매장'}</span>
      </div>
    </div>
  );
};

export default ReceiptOrderHeader;
