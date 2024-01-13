import React, { useEffect, useState } from 'react';
import { useSalesQuery } from '@/hooks/sales/useSalesQuery';
import useOrderStore from '@/shared/store/order';
import { groupByKey } from '@/shared/helper';
import { Tables } from '@/types/supabase';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useNumberOrderQuery } from '@/hooks/order/useNumberOrderQuery';
import styles from './styles/SuccessContainer.module.css';
import Image from 'next/image';
import image from '@/../public/images/image-success.png';
import { useRouter } from 'next/router';

const SuccessContainer = ({ payment }: { payment?: Payment }) => {
  const { orderList, storeId, tableId, menuData, orderNumber, getTotalPrice, orderType, orderId, setOrderId } =
    useOrderStore();
  const { addSales } = useSalesQuery();
  const { addStoreOrder } = useStoreOrderQuery();
  const { addNumberOrder } = useNumberOrderQuery();
  const { incrementOrderNumber } = useStoreQuery();
  const [isPageLoading, setIsPageLoading] = useState(false);
  const router = useRouter();

  const clickCheckOrderHandler = () => {
    router.push('/order/receipt');
  };

  useEffect(() => {
    if (payment?.status === 'DONE') {
      if (!orderType) {
        console.error('주문 타입이 없습니다.');
        return;
      }

      if (!storeId) {
        console.error('가게 정보가 없습니다.');
        return;
      }

      // 전역값에 담긴 orderId가 null일때만 insert한다.
      // 결제 승인시 sales테이블에 담아놓은 orderList 데이터를 insert 한다.
      if (orderId === null) {
        const group = groupByKey<Tables<'menu_item'>>(orderList, 'id');
        const salesData = [...group].map(([, value]) => ({
          store_id: storeId,
          sales_date: payment.approvedAt,
          product_name: value[0].name,
          product_ea: value.length,
          product_category: menuData?.find(menu => menu.id === value[0].category_id)!.name,
          product_price: value[0].price,
        })) as Omit<Tables<'sales'>, 'id'>[];

        addSales(salesData);
        incrementOrderNumber(storeId);
        setOrderId(payment.orderId);
      }
    }
  }, [orderList]);

  // sales 테이블에 데이터 업로드시 orderNumber가 바뀐다. orderNumber가 바뀌면
  // 주문내역 테이블 (order_store, order_number)에 insert 한다.
  useEffect(() => {
    if (payment?.status === 'DONE' && storeId && orderNumber > 0) {
      const orderData = {
        order_number: useOrderStore.getState().orderNumber,
        store_id: storeId,
        menu_list: orderList.map(order => JSON.parse(JSON.stringify(order))),
        order_time: payment.approvedAt,
        order_id: payment.orderId,
        total_price: getTotalPrice(),
        is_done: false,
        payment_method: payment.method,
      };

      if (orderType.type == 'togo') {
        // 포장 주문 insert !!
        addNumberOrder({ ...orderData, is_togo: true });
      } else if (orderType.type === 'store') {
        // 매장 주문 insert!
        if (tableId) {
          addStoreOrder({ ...orderData, table_id: tableId });
        } else {
          addNumberOrder({ ...orderData, is_togo: false });
        }
      }
    }
  }, [orderNumber]);

  useEffect(() => {
    setIsPageLoading(true);
  }, []);

  return (
    <>
      {isPageLoading && (
        <div className={styles.container}>
          <Image src={image} alt={'성공 이미지'} width={200} height={200} />
          <div className={styles.textBox}>
            <span>주문이 완료되었습니다!</span>
            <em>
              주문 번호는 <strong>{orderNumber}</strong> 입니다.
            </em>
          </div>
          <div className={styles.checkOrder} onClick={clickCheckOrderHandler}>
            주문 확인하기
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessContainer;
