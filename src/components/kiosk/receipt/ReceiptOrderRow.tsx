import styles from './styles/ReceiptOrderRow.module.css';
import Image from 'next/image';
import { MenuItemWithOption } from '@/types/supabase';
import { convertNumberToWon, groupByKey } from '@/shared/helper';
import CartOptionRow from '@/components/kiosk/cart/CartOptionRow';
import { getOptionPriceByList } from '@/shared/store/kiosk';
import { useTranslation } from 'next-i18next';

const ReceiptOrderRow = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const { i18n } = useTranslation();
  const group = groupByKey<MenuItemWithOption>(itemList, 'unique');

  return (
    <>
      {[...group].map(([key, value]) => (
        <div key={key} className={styles.container}>
          <Image
            src={value[0].image_url ?? ''}
            alt={value[0].name ?? ''}
            width={100}
            height={100}
            priority={true}
          ></Image>
          <div className={styles.wrapper}>
            <div className={styles.info}>
              <h2 className={styles.productName}>{value[0].name}</h2>
              <CartOptionRow menu={value} />
            </div>
            <span className={styles.productPrice}>
              {convertNumberToWon(
                value.reduce((acc, cur) => acc + cur.price, 0) +
                  getOptionPriceByList(value.map(item => item.menu_option).flat()),
                i18n.language === 'ko',
              )}
            </span>
          </div>
          <div className={styles.productEa}>{value.length}</div>
        </div>
      ))}
    </>
  );
};

export default ReceiptOrderRow;
