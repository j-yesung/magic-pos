import { StoreWithOrderInfo } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import QrCodeListItem from '../qrCodeListItem/QrCodeListItem';
import styles from './styles/ShopQrCodeContainer.module.css';

const ShopQrCodeContainer = () => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<StoreWithOrderInfo[]>(['management'])
  const storeTable = data && data[0].store_table;

  return (
    <div className={styles['shop-qr-code-container']}>
      <div className={styles['shop-qr-code-title']}>매장용 QR코드</div>
      <div className={clsx(styles['shop-qr-code-list-box'],
        storeTable?.length === 1
          ? styles['grid-row-1']
          : storeTable?.length === 2
            ? styles['grid-row-2']
            : styles['qr-code-svg-box'])}>
        {
          storeTable?.sort((a, b) => a.position && b.position && a.position > b.position ? 1 : -1).map((item, index) => {
            return (
              <QrCodeListItem key={item.id} storeTable={item} orderType={`table${item.position}`} index={index} />
            )
          })
        }
      </div>
    </div>
  )
}

export default ShopQrCodeContainer