import { StoreWithOrderInfo } from '@/types/supabase';
import PackagingContainer from './PackagingContainer';
import ShopContainer from './ShopContainer';
import styles from './styles/ManagementContainer.module.css';

const ManagementContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  return (
    <div className={styles['managementContainer']}>
      <ShopContainer managementData={managementData} />
      <PackagingContainer managementData={managementData} />
    </div>
  );
};

export default ManagementContainer;
