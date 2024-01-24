import { StoreWithOrderInfo } from '@/types/supabase';
import PackagingContainer from './PackagingContainer';
import ShopContainer from './ShopContainer';
import ShopIsNotTableContainer from './ShopIsNotTableContainer';
import styles from './styles/ManagementContainer.module.css';

const ManagementContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  return (
    <div className={styles['managementContainer']}>
      {managementData?.[0]?.use_table ? (
        <ShopContainer managementData={managementData} />
      ) : (
        <ShopIsNotTableContainer managementData={managementData} />
      )}
      <PackagingContainer managementData={managementData} />
    </div>
  );
};

export default ManagementContainer;
