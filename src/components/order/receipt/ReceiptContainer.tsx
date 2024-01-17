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
import { useRouter } from 'next/router';

const ReceiptContainer = () => {
  const orderId = useOrderStore(state => state.orderId);
  const storeId = useOrderStore(state => state.storeId);
  const { storeOrderData } = useStoreOrderQuery(orderId ?? '');
  const { numberOrderData } = useNumberOrderQuery(orderId ?? '');
  const [orderData, setOrderData] = useState<OrderDataWithStoreName>(null);
  const [groupData, setGroupData] = useState<Map<string, Tables<'menu_item'>[]>>(new Map());
  const [orderType, setOrderType] = useState<OrderType>({ type: 'store' });
  const [isOrderDone, setIsOrderDone] = useState(false);
  const router = useRouter();

  const clickOrderMoreHandler = () => {
    router.push(`/order/${storeId}`);
  };

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
      if (storeOrderData.data?.is_done) {
        setIsOrderDone(true);
      }
    }

    // 번호표 주문 (포장, 홀)
    if (numberOrderData?.data) {
      setOrderData(numberOrderData.data);
      // 포장 주문일 경우
      if (numberOrderData.data.is_togo) setOrderType({ type: 'togo' });

      if (numberOrderData.data?.is_done) {
        setIsOrderDone(true);
      }
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
          {isOrderDone ? (
            <button onClick={clickOrderMoreHandler}>메뉴가 준비 되었습니다! 더 담으러 가기</button>
          ) : (
            <p>현재 메뉴가 준비 중 입니다...</p>
          )}
          <TotalPrice itemList={orderData?.menu_list} />
        </>
      )}
    </div>
  );
};

export default ReceiptContainer;
