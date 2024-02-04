import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import OrderTypeContainer from '@/components/kiosk/order-type/OrderTypeContainer';
import MenuContainer from '@/components/kiosk/menu/MenuContainer';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { Virtual } from 'swiper/modules';
import useKioskState, { setOptionSwiperRef } from '@/shared/store/kiosk';

const CartContainer = dynamic(() => import('@/components/kiosk/cart/CartContainer'));
const MenuOptionContainer = dynamic(() => import('@/components/kiosk/menu-option/MenuOptionContainer'));
const PaymentContainer = dynamic(() => import('@/components/kiosk/payment/PaymentContainer'));

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
    </Swiper>
  );
};

export default KioskContainer;
