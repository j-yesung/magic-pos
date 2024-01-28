import AdminLayout from '@/components/layout/admin/AdminLayout';
import OrderCheckList from '@/components/order-check-list/OrderCheckList';
import Head from 'next/head';
import { ReactNode } from 'react';
import { makeTitle } from '@/shared/helper';

const OrderCheckListPage = () => {
  return (
    <>
      <Head>
        <title>{makeTitle('주문 내역 확인')}</title>
        <meta name="description" content="NextJS Events" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="파워레인조" />
        <meta name="keywords" content="magic pos, 매직 포스, 키오스크, 주문내역확인, 주문관리" />
        <meta name="description" content="magic pos의 주문내역을 확인 하는 페이지 입니다. " />
      </Head>
      <OrderCheckList />
    </>
  );
};

OrderCheckListPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default OrderCheckListPage;
