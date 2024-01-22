import useManagementStore from '@/shared/store/management';
import { StoreWithOrderInfo } from '@/types/supabase';
import clsx from 'clsx';
import SideBarContainer from './SideBarContainer';
import styles from './styles/ManagementSideBar.module.css';
import CloseButton from '/public/icons/close.svg';

const ManagementSideBar = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  const { isSideBar, orderStatus, tableNumber, setIsSideBar } = useManagementStore();

  return (
    <>
      <div
        className={clsx(styles['side-bar-background'], isSideBar && styles['show-side-bar-bg'])}
        onClick={() => {
          setIsSideBar();
        }}
      ></div>
      <div className={clsx(styles['side-bar-wrapper'], isSideBar && styles['show-side-bar'])}>
        <div className={styles['side-bar-title']}>
          <span>
            {' '}
            {orderStatus} {tableNumber}
          </span>
          <span
            className={styles['close-button']}
            onClick={() => {
              setIsSideBar();
            }}
          >
            <CloseButton width={40} height={40} />
          </span>
        </div>
        <SideBarContainer managementData={managementData} />
      </div>
    </>
  );
};

export default ManagementSideBar;
