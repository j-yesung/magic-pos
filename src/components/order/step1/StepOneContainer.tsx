import React from 'react';
import ButtonContainer from '@/components/order/step1/ButtonContainer';
import { useSwiper } from 'swiper/react';

const StepOneContainer = () => {
  const swiper = useSwiper();

  return (
    <div className="w-screen">
      <h1 className="absolute top-1/4">포장 하시나요 드시고 가시나요?</h1>
      <ButtonContainer />
      <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
    </div>
  );
};

export default StepOneContainer;
