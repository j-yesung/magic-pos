import OrderLayout from '@/components/layout/order/OrderLayout';
import { fetchCategoriesWithMenuItemByStoreId } from '@/server/api/menu-category';
import { isEmptyObject } from '@/shared/helper';
import useOrderStore from '@/shared/store/order';
import { CategoryWithMenuItem } from '@/types/supabase';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import 'swiper/css';
import 'swiper/css/virtual';

const OrderIndexPage = ({ menuData }: { menuData: CategoryWithMenuItem[] }) => {
  const { setMenuData } = useOrderStore();
  useEffect(() => {
    // window.history.replaceState({}, '/order', '/order');
    // TODO: 에러 처리
    if (isEmptyObject(menuData)) console.error('something wrong');
    else setMenuData(menuData);
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
