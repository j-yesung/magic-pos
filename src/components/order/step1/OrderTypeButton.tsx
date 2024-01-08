import React from 'react';

const OrderTypeButton = ({ order }: { order: OrderType }) => {
  return <button className="w-2/5 h-40 border-2 rounded-xl">{order.type === 'togo' ? '포장' : '매장'}</button>;
};

export default OrderTypeButton;
