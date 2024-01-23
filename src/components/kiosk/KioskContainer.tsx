import React, { useEffect, useRef } from 'react';
import OrderTypeContainer from '@/components/kiosk/order-type/OrderTypeContainer';
import MenuContainer from '@/components/kiosk/menu/MenuContainer';
import CartContainer from '@/components/kiosk/cart/CartContainer';
import PaymentContainer from '@/components/kiosk/payment/PaymentContainer';
import SuccessContainer from '@/components/kiosk/success/SuccessContainer';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import useKioskState, { setOptionSwiperRef } from '@/shared/store/kiosk';
import MenuOptionContainer from '@/components/kiosk/menu-option/MenuOptionContainer';

/**
 * 키오스크 화면을 전반적으로 감싸는 Container
 * 모든 화면은 Swiper 컴포넌트 안에 있으며, 메뉴 선택의 경우에는 Swiper안에 Swiper로 되어있다.
 * @constructor
 */
const KioskContainer = () => {
  const swiperRef = useKioskState(state => state.swiperRef);
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

export default KioskContainer;
