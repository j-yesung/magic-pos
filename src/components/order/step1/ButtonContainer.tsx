import React from 'react';
import OrderTypeButton from '@/components/order/step1/OrderTypeButton';

const ButtonContainer = () => {
  return (
    <div className="flex flex-col w-full h-full justify-center content-center">
      <div className="flex justify-around">
        <OrderTypeButton order={{ type: 'togo' }} />
        <OrderTypeButton order={{ type: 'store' }} />
      </div>
    </div>
  );
};

export default ButtonContainer;
