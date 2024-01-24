import { MenuItemWithOption, OrderDataWithStoreName } from '@/types/supabase';
import ReceiptOrderHeader from '@/components/kiosk/receipt/ReceiptOrderHeader';
import { groupByKey } from '@/shared/helper';
import ReceiptOrderRow from '@/components/kiosk/receipt/ReceiptOrderRow';
import styles from './styles/ReceiptOrder.module.css';
import ReceiptPrice from '@/components/kiosk/receipt/ReceiptPrice';

const ReceiptOrder = ({ data }: { data: OrderDataWithStoreName }) => {
  const group = groupByKey<MenuItemWithOption>(data.menu_list, 'id');

  return (
    <div className={styles.container}>
      <ReceiptOrderHeader
        orderNumber={data.order_number}
        isTogo={data.is_togo}
        isDone={data.is_done}
        orderTime={data.order_time}
      />
      {[...group].map(([key, value]) => (
        <ReceiptOrderRow key={key} itemList={value} />
      ))}
      <ReceiptPrice itemList={data.menu_list} />
    </div>
  );
};

export default ReceiptOrder;
