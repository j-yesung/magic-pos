import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/supabase/menu-category';
import { GetServerSideProps } from 'next';
import { CategoryWithMenuItem } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';
import { isEmptyObject } from '@/shared/helper';
import { useRouter } from 'next/router';

const OrderIndexPage = ({
  menuData,
  storeId,
  tableId,
}: {
  menuData: CategoryWithMenuItem[];
  storeId: string;
  tableId: string;
}) => {
  const { setMenuData, setStoreId, setTableId } = useOrderStore();
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // window.history.replaceState({}, '/order', '/order');
    // TODO: 에러 처리
    if (isEmptyObject(menuData)) console.error('something wrong');
    else setMenuData(menuData);

    if (storeId) setStoreId(storeId);
    if (tableId) setTableId(tableId);

    // if (orderNumber)

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
