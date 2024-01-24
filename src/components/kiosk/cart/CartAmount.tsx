import styles from '@/components/kiosk/cart/styles/CartAmount.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { addOrderList, subtractOrderList } from '@/shared/store/kiosk';
import { FaMinus, FaPlus } from 'react-icons/fa6';

const CartAmount = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const handleClickUpQuantity = (item: MenuItemWithOption) => {
    addOrderList([item]);
  };

  const handleClickDownQuantity = (item: MenuItemWithOption) => {
    subtractOrderList(item.unique);
  };

  return (
    <div className={styles.container}>
      <button onClick={handleClickDownQuantity.bind(null, itemList[0])}>
        <FaMinus size={15} />
      </button>
      <span className={styles.quantity}>{itemList.length}</span>
      <button onClick={handleClickUpQuantity.bind(null, itemList[0])}>
        <FaPlus size={15} />
      </button>
    </div>
  );
};

export default CartAmount;
