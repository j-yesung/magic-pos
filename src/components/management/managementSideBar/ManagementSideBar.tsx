import useManagementStore from '@/shared/store/management';
import { StoreWithOrderInfo } from '@/types/supabase';
import SideBarButtonBox from './SideBarButtonBox';
import SideBarContainer from './SideBarContainer';
import styles from './styles/ManagementSideBar.module.css';

const ManagementSideBar = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  const { orderStatus, tableNumber } = useManagementStore();

  return (
    <div className={styles['side-bar-wrapper']}>
      <div className={styles['side-bar-title']}>
        {orderStatus} {tableNumber}
      </div>
      <SideBarContainer managementData={managementData} />
      <SideBarButtonBox />
    </div>
  );
};

export default ManagementSideBar;
