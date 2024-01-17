import React from 'react';
import { MenuItemWithOption, OrderDataWithStoreName } from '@/types/supabase';
import ReceiptOrderHeader from '@/components/order/receipt/ReceiptOrderHeader';
import { groupByKey } from '@/shared/helper';
import ReceiptOrderRow from '@/components/order/receipt/ReceiptOrderRow';

const ReceiptOrder = ({ data }: { data: OrderDataWithStoreName }) => {
  const group = groupByKey<MenuItemWithOption>(data.menu_list, 'id');
  console.log(' (ReceiptOrderRow.tsx:10) ~ group', group);

  console.log(' (OrderContainer.tsx:7) ~ menuList', data);

  return (
    <div>
      <ReceiptOrderHeader orderNumber={data.order_number} orderName={data.name} isTogo={data.is_togo} />
      {[...group].map(([key, value]) => (
        <ReceiptOrderRow key={key} itemList={value} />
      ))}
    </div>
  );
};

export default ReceiptOrder;
