import React, { useEffect, useState } from 'react';
import styles from './styles/ReceiptContainer.module.css';
import ReceiptHeader from '@/components/order/receipt/ReceiptHeader';
import ReceiptRow from '@/components/order/receipt/ReceiptRow';
import ReceiptFooter from '@/components/order/receipt/ReceiptFooter';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useNumberOrderQuery } from '@/hooks/order/useNumberOrderQuery';
import useOrderStore from '@/shared/store/order';
import { Tables } from '@/types/supabase';
import { groupByKey } from '@/shared/helper';

const ReceiptContainer = () => {
  const { orderId } = useOrderStore();
  const { storeOrderData } = useStoreOrderQuery(orderId ?? '');
  const { numberOrderData } = useNumberOrderQuery(orderId ?? '');
  const [orderData, setOrderData] = useState<Tables<'order_store'> | Tables<'order_number'> | null>(null);
  const [groupData, setGroupData] = useState<Map<string, Tables<'menu_item'>[]>>(new Map());

  useEffect(() => {
    if (orderData) {
      const group = groupByKey<Tables<'menu_item'>>(orderData?.menu_list as Tables<'menu_item'>[], 'id');
      setGroupData(group);
    }
  }, [orderData]);

  useEffect(() => {
    if (storeOrderData?.data) {
      setOrderData(storeOrderData.data);
    }
    if (numberOrderData?.data) {
      setOrderData(numberOrderData.data);
    }
  }, [storeOrderData, numberOrderData]);

  return (
    <div className={styles.container}>
      <div className={styles.rowWrapper}>
        <ReceiptHeader />
        {groupData && [...groupData].map(([key, value]) => <ReceiptRow key={key} itemList={value} />)}
      </div>
      {orderData && <ReceiptFooter allItemList={orderData?.menu_list as Tables<'menu_item'>[]} />}
    </div>
  );
};

export default ReceiptContainer;
