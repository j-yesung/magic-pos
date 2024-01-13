import React, { ReactNode, useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { GetServerSideProps } from 'next';
import { CategoryWithMenuItem } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';
import { isEmptyObject } from '@/shared/helper';
import { useRouter } from 'next/router';
import OrderContainer from '@/components/order/OrderContainer';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useNumberOrderQuery } from '@/hooks/order/useNumberOrderQuery';

const OrderIndexPage = ({
  menuData,
  storeId,
  tableId,
}: {
  menuData: CategoryWithMenuItem[];
  storeId: string;
  tableId: string;
}) => {
  const { setMenuData, setStoreId, setTableId, orderId, resetOrderList, setStoreName } = useOrderStore();
  const { storeOrderData } = useStoreOrderQuery(orderId ?? '');
  const { numberOrderData } = useNumberOrderQuery(orderId ?? '');
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (orderId) {
      (async () => {
        if (storeOrderData?.data && !storeOrderData.data?.is_done) {
          router.push('/order/receipt');
          return;
        }

        if (numberOrderData?.data && !numberOrderData.data?.is_done) {
          router.push('/order/receipt');
          return;
        }
        resetOrderList();
      })();
    }
  }, [numberOrderData, storeOrderData]);

  useEffect(() => {
    // 주소창에 uuid가 노출되는 것을 막기 위해 주소창의 URL만을 변경한다. (페이지 이동X)
    // window.history.replaceState({}, '/order', '/order');
    // TODO: 에러 처리
    if (isEmptyObject(menuData)) console.error('something wrong');
    else {
      setMenuData(menuData);
      setStoreName(menuData[0].store.business_name ?? '');
    }

    if (storeId) setStoreId(storeId);
    if (tableId) setTableId(tableId);
    setIsLoaded(true);
  }, []);

  return <>{isLoaded && <OrderContainer />}</>;
};

OrderIndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId, tableId = null } = context.query;
  const { data: menuData } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  return {
    props: {
      menuData,
      storeId,
      tableId,
    },
  };
};
