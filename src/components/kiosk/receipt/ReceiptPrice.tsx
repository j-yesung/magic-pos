import styles from './styles/ReceiptPrice.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { getTotalPrice } from '@/shared/store/kiosk';
import { convertNumberToWon } from '@/shared/helper';

const ReceiptPrice = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  return (
    <div className={styles.container}>
      <span>총 주문 금액</span>
      <span>{convertNumberToWon(getTotalPrice(itemList))}</span>
    </div>
  );
};

export default ReceiptPrice;
