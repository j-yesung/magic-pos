import MenuHeader from '@/components/kiosk/common/MenuHeader';
import ReceiptOrder from '@/components/kiosk/receipt/ReceiptOrder';
import { useNumberOrderFetchQuery } from '@/hooks/query/order/useNumberOrderFetchQuery';
import { useStoreOrderFetchQuery } from '@/hooks/query/order/useStoreOrderFetchQuery';
import useKioskState, { ORDER_STEP, setStep } from '@/shared/store/kiosk';
import { OrderDataWithStoreName } from '@/types/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './styles/ReceiptContainer.module.css';
import { useTranslation } from 'next-i18next';

const ReceiptContainer = () => {
  const orderIdList = useKioskState(state => state.orderIdList);
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const storeId = useKioskState(state => state.storeId) ?? '';
  const { storeOrderData, isStoreOrderFetching } = useStoreOrderFetchQuery(orderIdList, storeId);
  const { numberOrderData, isNumberOrderFetching } = useNumberOrderFetchQuery(orderIdList, storeId);
  const [orderDataList, setOrderDataList] = useState<OrderDataWithStoreName[]>([]);
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const clickOrderMoreHandler = () => {
    setStep(ORDER_STEP.CHOOSE_ORDER_TYPE);
    router.push(`/kiosk/${storeId}`);
  };

  // order_store 테이블과 order_togo 테이블에서 주문 내역 데이터를 가져온다.
  useEffect(() => {
    if (!isStoreOrderFetching && !isNumberOrderFetching) {
      // 매장 주문
      if (storeOrderData?.data) {
        storeOrderData.data.forEach(d => {
          setOrderDataList(prev => [...prev, d]);
        });
      }

      if (numberOrderData?.data) {
        numberOrderData.data.forEach(d => {
          setOrderDataList(prev => [...prev, d]);
        });
      }
    }
  }, [isNumberOrderFetching, isStoreOrderFetching, storeOrderData, numberOrderData]);

  useEffect(() => {
    setStep(ORDER_STEP.RECEIPT);
    i18n.changeLanguage(selectedLanguage.split('-')[1]);
    if (orderIdList.length === 0) router.push(`/kiosk/`);
  }, []);

  return (
    <div className={styles.container}>
      <MenuHeader />
      <section>
        {orderDataList.map((data: OrderDataWithStoreName) => (
          <ReceiptOrder key={data.id} data={data} />
        ))}
      </section>
      <button className={styles.orderMoreButton} onClick={clickOrderMoreHandler}>
        {t('order-more')}
      </button>
    </div>
  );
};

export default ReceiptContainer;
