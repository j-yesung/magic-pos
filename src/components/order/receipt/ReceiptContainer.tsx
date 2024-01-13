import React, { useEffect, useState } from 'react';
import styles from './styles/ReceiptContainer.module.css';
import ReceiptHeader from '@/components/order/receipt/ReceiptHeader';
import ReceiptRow from '@/components/order/receipt/ReceiptRow';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useNumberOrderQuery } from '@/hooks/order/useNumberOrderQuery';
import useOrderStore from '@/shared/store/order';
import { OrderDataWithStoreName, Tables } from '@/types/supabase';
import { groupByKey } from '@/shared/helper';
import TotalPrice from '@/components/order/common/TotalPrice';

const ReceiptContainer = () => {
  const { orderId } = useOrderStore();
  const { storeOrderData } = useStoreOrderQuery(orderId ?? '');
  const { numberOrderData } = useNumberOrderQuery(orderId ?? '');
  const [orderData, setOrderData] = useState<OrderDataWithStoreName>(null);
  const [groupData, setGroupData] = useState<Map<string, Tables<'menu_item'>[]>>(new Map());
  const [orderType, setOrderType] = useState<OrderType>({ type: 'store' });

  // 주문 데이터가 있다면 그룹화 합니다.
  useEffect(() => {
    if (orderData) {
      const group = groupByKey<Tables<'menu_item'>>(orderData?.menu_list as Tables<'menu_item'>[], 'id');
      setGroupData(group);
    }
  }, [orderData]);

  // order_store 테이블과 order_togo 테이블에서 주문 내역 데이터를 가져온다.
  useEffect(() => {
    // 매장 주문
    if (storeOrderData?.data) {
      setOrderData(storeOrderData.data);
    }

    // 번호표 주문 (포장, 홀)
    if (numberOrderData?.data) {
      setOrderData(numberOrderData.data);

      // 포장 주문일 경우
      if (numberOrderData.data.is_togo) setOrderType({ type: 'togo' });
    }
  }, [storeOrderData]);

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
          <TotalPrice allItemList={orderData?.menu_list as Tables<'menu_item'>[]} />
        </>
      )}
    </div>
  );
};

export default ReceiptContainer;
