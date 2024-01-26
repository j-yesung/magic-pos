import { StoreWithOrderInfo } from '@/types/supabase';
import clsx from 'clsx';
import QrCodeListItem from '../qrCodelistItem/QrCodeListItem';
import styles from './styles/ShopQrCodeContainer.module.css';

const ShopQrCodeContainer = ({ data }: { data?: StoreWithOrderInfo[] }) => {
  const storeTable = data && data[0].store_table;

  return (
    <div className={styles['shop-qr-code-container']}>
      {/* <div className={styles['shop-qr-code-title']}>매장용 QR코드</div> */}
      <div
        className={clsx(
          styles['shop-qr-code-list-box'],
          styles['qr-code-svg-box'],
          storeTable?.length === 1 && styles['grid-row-1'],
          storeTable?.length === 2 && styles['grid-row-2'],
          storeTable?.length === 3 && styles['grid-row-3'],
        )}
      >
        {storeTable
          ?.sort((a, b) => (a.position && b.position && a.position > b.position ? 1 : -1))
          .map(item => {
            return <QrCodeListItem key={item.id} storeTable={item} orderType={`table${item.position}`} />;
          })}
      </div>
    </div>
  );
};

export default ShopQrCodeContainer;
