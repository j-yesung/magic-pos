import { StoreWithOrderInfo } from '@/types/supabase';
import { TbPaperBag } from 'react-icons/tb';
import PackagingListItem from './PackagingListItem';
import styles from './styles/PackagingContainer.module.css';

const PackagingContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  return (
    <div className={styles['packaging-container']}>
      <div className={styles['packaging-title']}>
        <TbPaperBag size={28} />
        <span>포장 관리</span>
        <p>{managementData?.[0].order_number.filter(item => item.is_togo).length}</p>
      </div>
      <div className={styles['packaging-list-wrap']}>
        <div className={styles['packaging-list']}>
          {managementData?.[0]?.order_number
            .filter(item => item.is_togo)
            .sort((a, b) => {
              if (a.order_time && b.order_time) {
                return a.order_time < b.order_time ? -1 : 1;
              }
              return 0;
            })
            .map(item => {
              return <PackagingListItem key={item.id} packagingData={item} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default PackagingContainer;
