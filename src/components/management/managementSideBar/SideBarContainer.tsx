import { convertNumberToWon } from '@/shared/helper';
import useManagementStore from '@/shared/store/management';
import { OrderDataWithStoreName, StoreWithOrderInfo } from '@/types/supabase';
import { useEffect, useState } from 'react';
import OrderItem from './OrderItem';
import styles from './styles/SideBarContainer.module.css';

const SideBarContainer = ({ managementData }: { managementData?: StoreWithOrderInfo[] }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { orderData, orderId, setOrderData } = useManagementStore();

  useEffect(() => {
    if (managementData) {
      const orderStoreFilterData = managementData?.[0]?.order_store.filter(x => orderId.includes(x.id));
      const orderNumberFilterData = managementData?.[0]?.order_number.filter(x => orderId.includes(x.id));
      const resultOrderData =
        orderStoreFilterData?.length === 0 ? orderNumberFilterData : (orderStoreFilterData as OrderDataWithStoreName[]);
      setOrderData(resultOrderData);
      let total = 0;
      for (let i = 0; i < resultOrderData?.length; i++) {
        total += resultOrderData[i].total_price;
        setTotalPrice(total);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderId]);

  return (
    <div className={styles['sideBar-container']}>
      <ul className={styles['order_list']}>{orderData?.map(item => <OrderItem key={item.id} orderData={item} />)}</ul>
      <div className={styles['total-price']}>
        <div>총 금액 : </div>
        <div>{convertNumberToWon(totalPrice)}</div>
      </div>
    </div>
  );
};

export default SideBarContainer;
