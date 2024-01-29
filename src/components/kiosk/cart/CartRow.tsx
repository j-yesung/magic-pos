import styles from './styles/CartRow.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';
import { getOptionPriceByList } from '@/shared/store/kiosk';
import Image from 'next/image';
import CartOptionRow from '@/components/kiosk/cart/CartOptionRow';
import CartAmount from '@/components/kiosk/cart/CartAmount';
import { useTranslation } from 'next-i18next';

const CartRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const { i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <Image src={itemList[0].image_url ?? ''} alt={itemList[0].name ?? ''} width={100} height={100} />
      <div className={styles.menuInfo}>
        <div className={styles.menuNameOption}>
          <div>
            <h2>{itemList[0].name}</h2>
            {itemList[0].menu_option?.length > 0 && <CartOptionRow menu={itemList} />}
          </div>
          <span>
            {convertNumberToWon(
              itemList.reduce((acc, cur) => acc + cur.price, 0) +
                getOptionPriceByList(itemList.map(item => item.menu_option).flat()),
              i18n.language === 'ko',
            )}
          </span>
        </div>
        <div>
          <CartAmount itemList={itemList} />
        </div>
      </div>
    </div>
  );
};

export default CartRow;
