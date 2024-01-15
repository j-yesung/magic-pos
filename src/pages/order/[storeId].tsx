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
import useToast from '@/hooks/toast/useToast';

const OrderIndexPage = ({
  menuData,
  storeId,
  tableId,
}: {
  menuData: CategoryWithMenuItem[];
  storeId: string;
  tableId: string;
}) => {
  const { setMenuData, setStoreId, setTableId, orderNumber, orderType } = useOrderStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (orderNumber !== 0) {
      router.push('/order/receipt');
      return;
    }
    // 주소창에 uuid가 노출되는 것을 막기 위해 주소창의 URL만을 변경한다. (페이지 이동X)
    // window.history.replaceState({}, '/order', '/order');
    // TODO: 에러 처리
    if (isEmptyObject(menuData)) console.error('something wrong');
    else setMenuData(menuData);

    if (storeId) setStoreId(storeId);
    if (tableId) setTableId(tableId);

    setIsLoaded(true);

    toast('test1', {
      type: 'info',
      position: 'top-right',
      showCloseButton: false,
      autoClose: 2000,
    });

    toast('test2', {
      type: 'info',
      position: 'top-right',
      showCloseButton: false,
      autoClose: 3000,
    });

    toast('test3', {
      type: 'info',
      position: 'top-left',
      showCloseButton: false,
      autoClose: 2000,
    });

    toast('test3', {
      type: 'info',
      position: 'top-left',
      showCloseButton: false,
      autoClose: 4000,
    });

    toast('bottom1', {
      type: 'info',
      position: 'bottom-left',
      showCloseButton: false,
      autoClose: 1000,
    });
    toast('bottom2', {
      type: 'info',
      position: 'bottom-left',
      showCloseButton: false,
      autoClose: 5000,
    });
    toast('bottom3', {
      type: 'info',
      position: 'bottom-left',
      showCloseButton: false,
      autoClose: 3000,
    });
    toast('bottom3', {
      type: 'info',
      position: 'bottom-left',
      showCloseButton: false,
      autoClose: 2000,
    });

    toast('bottom1', {
      type: 'info',
      position: 'bottom-right',
      showCloseButton: false,
      autoClose: 1000,
    });
    toast('bottom2', {
      type: 'info',
      position: 'bottom-right',
      showCloseButton: false,
      autoClose: 5000,
    });
    toast('bottom3', {
      type: 'info',
      position: 'bottom-right',
      showCloseButton: false,
      autoClose: 2000,
    });
  }, []);

  return <>{isLoaded && <OrderContainer />}</>;
};

OrderIndexPage.getLayout = (page: ReactNode) => <OrderLayout>{page}</OrderLayout>;

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId, tableId = null } = context.query;
  const { data } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  return {
    props: {
      menuData: data,
      storeId,
      tableId,
    },
  };
};
