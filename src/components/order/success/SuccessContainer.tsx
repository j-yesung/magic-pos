import React, { useEffect, useState } from 'react';
import { useSales } from '@/hooks/sales/useSales';
import useOrderStore from '@/shared/store/order';
import { groupByKey } from '@/shared/helper';
import { Tables } from '@/types/supabase';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';

const SuccessContainer = ({ payment }: { payment?: Payment }) => {
  const { orderList, storeId, menuData, orderNumber } = useOrderStore();
  const { addSales } = useSales();
  const { incrementOrderNumber } = useStoreQuery();
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    // 결제 승인시 sales테이블에 담아놓은 데이터를 업로드 한다.
    if (payment?.status === 'DONE') {
      const group = groupByKey<Tables<'menu_item'>>(orderList, 'id');
      const insertDataList = [...group].map(([, value]) => ({
        store_id: storeId,
        sales_date: payment.approvedAt,
        product_name: value[0].name,
        product_ea: value.length,
        product_category: menuData?.find(menu => menu.id === value[0].category_id)!.name,
        product_price: value[0].price,
      })) as Omit<Tables<'sales'>, 'id'>[];

      // saels 업로드!
      addSales(insertDataList);
      incrementOrderNumber(storeId || '');
    }
  }, [orderList]);

  useEffect(() => {
    setIsPageLoading(true);
  }, []);

  return <>{isPageLoading && <div>주문 성공 고객님의 주문 번호는 {orderNumber}</div>}</>;
};

export default SuccessContainer;
