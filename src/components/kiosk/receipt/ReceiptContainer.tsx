import MenuHeader from '@/components/kiosk/common/MenuHeader';
import ReceiptOrder from '@/components/kiosk/receipt/ReceiptOrder';
import { useNumberOrderFetchQuery } from '@/hooks/order/useNumberOrderFetchQuery';
import { useStoreOrderFetchQuery } from '@/hooks/order/useStoreOrderFetchQuery';
import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import useKioskState, { ORDER_STEP, setStep, setStoreName } from '@/shared/store/kiosk';
import { OrderDataWithStoreName } from '@/types/supabase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from './styles/ReceiptContainer.module.css';
import { useTranslation } from 'react-i18next';

const ReceiptContainer = () => {
  const orderIdList = useKioskState(state => state.orderIdList);
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const storeId = useKioskState(state => state.storeId) ?? '';
  const { storeOrderData } = useStoreOrderFetchQuery(orderIdList, storeId);
  const { numberOrderData } = useNumberOrderFetchQuery(orderIdList, storeId);
  const [orderDataList, setOrderDataList] = useState<OrderDataWithStoreName[]>([]);
  const router = useRouter();
  const { storeInfo } = useFetchQuery({ storeId });
  const { t, i18n } = useTranslation();

  const clickOrderMoreHandler = () => {
    setStep(ORDER_STEP.CHOOSE_ORDER_TYPE);
    router.push(`/kiosk/${storeId}`);
  };

  // order_store 테이블과 order_togo 테이블에서 주문 내역 데이터를 가져온다.
  useEffect(() => {
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
  }, [storeOrderData, numberOrderData]);

  useEffect(() => {
    if (storeInfo) {
      setStoreName(storeInfo.business_name ?? '');
    }
  }, [storeInfo]);

  useEffect(() => {
    setStep(ORDER_STEP.RECEIPT);
    i18n.changeLanguage(selectedLanguage.split('-')[1]);
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
