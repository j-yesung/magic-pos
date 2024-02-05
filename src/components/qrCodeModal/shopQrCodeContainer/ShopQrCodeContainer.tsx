import { StoreTableInQRCode } from '@/types/supabase';
import clsx from 'clsx';
import QrCodeListItem from '../qrCodelistItem/QrCodeListItem';
import styles from './styles/ShopQrCodeContainer.module.css';

const ShopQrCodeContainer = ({ data }: { data: StoreTableInQRCode[] }) => {
  const storeTable = data && data[0].store_table;
  const totalTable = storeTable.length;
  return (
    <div className={styles['shop-qr-code-container']}>
      <div
        className={clsx(
          styles['shop-qr-code-list-box'],
          styles['qr-code-svg-box'],
          totalTable === 1 && styles['grid-row-1'],
          totalTable === 2 && styles['grid-row-2'],
          totalTable === 3 && styles['grid-row-3'],
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
