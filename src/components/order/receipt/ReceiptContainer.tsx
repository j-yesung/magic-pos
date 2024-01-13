import React, { useEffect, useState } from 'react';
import styles from './styles/ReceiptContainer.module.css';
import ReceiptHeader from '@/components/order/receipt/ReceiptHeader';
import ReceiptRow from '@/components/order/receipt/ReceiptRow';
import ReceiptFooter from '@/components/order/receipt/ReceiptFooter';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useNumberOrderQuery } from '@/hooks/order/useNumberOrderQuery';
import useOrderStore from '@/shared/store/order';
import { OrderDataWithStoreName, Tables } from '@/types/supabase';
import { groupByKey } from '@/shared/helper';

const ReceiptContainer = () => {
  const { orderId } = useOrderStore();
  const { storeOrderData } = useStoreOrderQuery(orderId ?? '');
  const { numberOrderData } = useNumberOrderQuery(orderId ?? '');
  const [orderData, setOrderData] = useState<OrderDataWithStoreName>(null);
  const [groupData, setGroupData] = useState<Map<string, Tables<'menu_item'>[]>>(new Map());
  const [orderType, setOrderType] = useState<OrderType>({ type: 'togo' });

  useEffect(() => {
    if (orderData) {
      const group = groupByKey<Tables<'menu_item'>>(orderData?.menu_list as Tables<'menu_item'>[], 'id');
      setGroupData(group);
    }
  }, [orderData]);

  useEffect(() => {
    if (storeOrderData?.data) {
      setOrderData(storeOrderData.data);
      setOrderType({ type: 'store' });
    }
    if (numberOrderData?.data) {
      // numberOrderData.data.
      setOrderData(numberOrderData.data);
      if (!numberOrderData.data.is_togo) setOrderType({ type: 'store' });
    }
  }, [storeOrderData, numberOrderData]);
  return (
    <div className={styles.container}>
      {orderData && groupData && (
        <>
          <div className={styles.rowWrapper}>
            <ReceiptHeader
              orderNumber={orderData.order_number}
              orderName={orderData.store.business_name}
              orderType={orderType}
            />
            {[...groupData].map(([key, value]) => (
              <ReceiptRow key={key} itemList={value} />
            ))}
          </div>
          <ReceiptFooter allItemList={orderData?.menu_list as Tables<'menu_item'>[]} />
        </>
      )}
    </div>
  );
};

export default ReceiptContainer;
