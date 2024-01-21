import React, { useEffect, useState } from 'react';
import styles from './styles/ReceiptContainer.module.css';
import { useStoreOrderSetQuery } from '@/hooks/order/useStoreOrderSetQuery';
import { useNumberOrderSetQuery } from '@/hooks/order/useNumberOrderSetQuery';
import useOrderStore, { ORDER_STEP, setStep, setStoreName } from '@/shared/store/order';
import { OrderDataWithStoreName } from '@/types/supabase';
import { useRouter } from 'next/router';
import ReceiptOrder from '@/components/order/receipt/ReceiptOrder';
import TotalPrice from '@/components/order/common/TotalPrice';
import { useStoreOrderFetchQuery } from '@/hooks/order/useStoreOrderFetchQuery';
import { useNumberOrderFetchQuery } from '@/hooks/order/useNumberOrderFetchQuery';
import MenuHeader from '@/components/order/common/MenuHeader';
import { useGetQuery } from '@/hooks/store/useGetQuery';

const ReceiptContainer = () => {
  const orderIdList = useOrderStore(state => state.orderIdList);
  const storeId = useOrderStore(state => state.storeId) ?? '';
  const { storeOrderData } = useStoreOrderFetchQuery(orderIdList, storeId);
  const { numberOrderData } = useNumberOrderFetchQuery(orderIdList, storeId);
  const [orderDataList, setOrderDataList] = useState<OrderDataWithStoreName[]>([]);
  const router = useRouter();
  const { storeInfo } = useGetQuery({ storeId });

  const clickOrderMoreHandler = () => {
    router.push(`/order/${storeId}`);
  };

  // order_store 테이블과 order_togo 테이블에서 주문 내역 데이터를 가져온다.
  useEffect(() => {
    // 매장 주문

    if (storeOrderData?.data && storeOrderData.data?.length > 0) {
      storeOrderData.data.forEach(d => {
        if (orderDataList.find(o => o.id === d.id)) return;
        setOrderDataList(prev => [...prev, d]);
      });
    }

    if (numberOrderData?.data && numberOrderData.data?.length > 0) {
      numberOrderData.data.forEach(d => {
        if (orderDataList.find(o => o.id === d.id)) return;
        setOrderDataList(prev => [...prev, d]);
      });
    }
  }, [storeOrderData, numberOrderData]);

  useEffect(() => {
    if (storeInfo) {
      setStoreName(storeInfo.business_name ?? '');
    }
  }, [storeInfo]);

  useEffect(() => {
    setStep(ORDER_STEP.RECEIPT);
  }, []);

  return (
    <div className={styles.container}>
      <MenuHeader />
      <section>
        {orderDataList.map((data: OrderDataWithStoreName) => (
          <ReceiptOrder key={data.id} data={data} />
        ))}
        <TotalPrice itemList={orderDataList.map(d => d.menu_list).flat()} />
      </section>
    </div>
  );
};

export default ReceiptContainer;
