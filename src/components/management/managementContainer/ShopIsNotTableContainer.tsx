import { StoreWithOrderInfo } from '@/types/supabase';
import { TbPaperBag } from 'react-icons/tb';
import ShopIsNotTableListItem from './ShopIsNotTableListItem';
import styles from './styles/ShopIsNotTableContainer.module.css';

const ShopIsNotTableContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  return (
    <div className={styles['shop-container']}>
      <div className={styles['shop-title']}>
        <TbPaperBag size={28} />
        <span>매장 관리</span>
        <p>{managementData?.[0].order_number.filter(item => !item.is_togo).length}</p>
      </div>
      <div className={styles['shop-list-wrap']}>
        <div className={styles['shop-list']}>
          {managementData?.[0]?.order_number
            .filter(item => !item.is_togo)
            .sort((a, b) => {
              if (a.order_time && b.order_time) {
                return a.order_time < b.order_time ? -1 : 1;
              }
              return 0;
            })
            .map(item => {
              return <ShopIsNotTableListItem key={item.id} shopData={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ShopIsNotTableContainer;
