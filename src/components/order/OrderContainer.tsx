import React, { useEffect, useRef } from 'react';
import OrderTypeContainer from '@/components/order/order-type/OrderTypeContainer';
import MenuContainer from '@/components/order/menu/MenuContainer';
import CartContainer from '@/components/order/cart/CartContainer';
import PaymentContainer from '@/components/order/payment/PaymentContainer';
import SuccessContainer from '@/components/order/success/SuccessContainer';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import useOrderState, { setOptionSwiperRef } from '@/shared/store/order';
import MenuOptionContainer from '@/components/order/menu-option/MenuOptionContainer';

/**
 * 키오스크 화면을 전반적으로 감싸는 Container
 * 모든 화면은 Swiper 컴포넌트 안에 있으며, 메뉴 선택의 경우에는 Swiper안에 Swiper로 되어있다.
 * @constructor
 */
const OrderContainer = () => {
  const swiperRef = useOrderState(state => state.swiperRef);
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
