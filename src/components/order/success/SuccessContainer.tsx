import React, { useEffect, useState } from 'react';
import { useSalesQuery } from '@/hooks/sales/useSalesQuery';
import useOrderStore from '@/shared/store/order';
import { groupByKey } from '@/shared/helper';
import { Tables } from '@/types/supabase';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import { useStoreOrderQuery } from '@/hooks/order/useStoreOrderQuery';
import { useTogoOrderQuery } from '@/hooks/order/useTogoOrderQuery';

const SuccessContainer = ({ payment }: { payment?: Payment }) => {
  const { orderList, storeId, tableId, menuData, orderNumber, getTotalPrice, orderType } = useOrderStore();
  const { addSales } = useSalesQuery();
  const { addStoreOrder } = useStoreOrderQuery();
  const { addNumberOrder } = useTogoOrderQuery();
  const { incrementOrderNumber } = useStoreQuery();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // 결제 승인시 sales테이블에 담아놓은 데이터를 업로드 한다.
    if (payment?.status === 'DONE') {
      if (!orderType) {
        console.error('주문 타입이 없습니다.');
        return;
      }

      if (!storeId) {
        console.error('가게 정보가 없습니다.');
        return;
      }

      if (orderNumber === 0) {
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
      }
    }
  }, [orderList]);

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

  return <>{isPageLoading && <div>주문 성공 고객님의 주문 번호는 {orderNumber}</div>}</>;
};

export default SuccessContainer;
