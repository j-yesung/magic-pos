import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { GetServerSideProps } from 'next';
import { CategoryWithMenuItem } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';
import { isEmptyObject } from '@/shared/helper';

const OrderIndexPage = ({ menuData, storeId }: { menuData: CategoryWithMenuItem[]; storeId: string }) => {
  const { setMenuData, setStoreId } = useOrderStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // window.history.replaceState({}, '/order', '/order');
    // TODO: 에러 처리
    if (isEmptyObject(menuData)) console.error('something wrong');
    else setMenuData(menuData);

    setStoreId(storeId);
    useOrderStore.persist.clearStorage();
    setIsLoaded(true);
  }, []);

  return (
    <>
      {isLoaded && (
        <main>
          <OrderLayout />
        </main>
      )}
    </>
  );
};

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId } = context.query;
  const { data } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  return {
    props: {
      menuData: data,
      storeId,
    },
  };
};
