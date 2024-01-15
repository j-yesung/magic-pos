import React, { useEffect, useRef } from 'react';
import OrderTypeContainer from '@/components/order/order-type/OrderTypeContainer';
import MenuContainer from '@/components/order/menu/MenuContainer';
import CartContainer from '@/components/order/cart/CartContainer';
import PaymentContainer from '@/components/order/payment/PaymentContainer';
import SuccessContainer from '@/components/order/success/SuccessContainer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import useOrderStore from '@/shared/store/order';
import MenuOptionContainer from '@/components/order/menu-option/MenuOptionContainer';
import { SwiperRef } from 'swiper/react';

const OrderContainer = () => {
  const { swiperRef, setOptionSwiperRef } = useOrderStore();
  const optionSwiperRef = useRef<SwiperRef>(null);

  useEffect(() => {
    if (optionSwiperRef) setOptionSwiperRef(optionSwiperRef);
  }, []);

  return (
    <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={1} virtual allowTouchMove={false} ref={swiperRef}>
      <SwiperSlide>
        <OrderTypeContainer />
      </SwiperSlide>
      <SwiperSlide>
        <Swiper
          modules={[Virtual]}
          spaceBetween={50}
          slidesPerView={1}
          virtual
          allowTouchMove={false}
          ref={optionSwiperRef}
        >
          <SwiperSlide>
            <MenuContainer />
          </SwiperSlide>
          <SwiperSlide>
            <MenuOptionContainer />
          </SwiperSlide>
        </Swiper>
      </SwiperSlide>
      <SwiperSlide>
        <CartContainer />
      </SwiperSlide>
      <SwiperSlide>
        <PaymentContainer />
      </SwiperSlide>
      <SwiperSlide>
        <SuccessContainer />
      </SwiperSlide>
    </Swiper>
  );
};

export default OrderContainer;
