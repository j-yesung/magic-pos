import React, { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';
import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/pages/api/menu-category';
import { GetServerSideProps } from 'next';
import { CategoryWithMenuItem } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';

const OrderIndexPage = ({ menuData }: { menuData: CategoryWithMenuItem }) => {
  const { setMenuData } = useOrderStore();
  useEffect(() => {
    // window.history.replaceState({}, '/order', '/order');
    setMenuData(menuData);
    if (Object.keys(menuData).length === 0) console.error('something wrong');
  }, []);

  return (
    <main>
      <OrderLayout />
    </main>
  );
};

export default OrderIndexPage;

export const getServerSideProps: GetServerSideProps = async context => {
  const { storeId } = context.query;
  const { data } = await fetchCategoriesWithMenuItemByStoreId((storeId || '').toString());

  return {
    props: {
      menuData: data,
    },
  };
};
