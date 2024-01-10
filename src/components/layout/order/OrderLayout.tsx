import Head from 'next/head';
import React, { useRef } from 'react';
import styles from './styles/OrderLayout.module.css';
import Footer from '@/components/layout/order/footer/Footer';
import OrderTypeContainer from '@/components/order/order-type/OrderTypeContainer';
import MenuContainer from '@/components/order/menu/MenuContainer';
import CartContainer from '@/components/order/cart/CartContainer';
import PaymentContainer from '@/components/order/payment/PaymentContainer';
import SuccessContainer from '@/components/order/success/SuccessContainer';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';
import { ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { usePaymentWidget } from '@/hooks/order/usePaymentWidget';

// 구매자의 고유 아이디를 불러와서 customerKey로 설정하세요.
// 이메일・전화번호와 같이 유추가 가능한 값은 안전하지 않습니다.
const TOSS_WIDGET_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_WIDGET_CLIENT_KEY as string;

/**
 * 일반인 KIOSK 레이아웃
 * @constructor
 */
const OrderLayout = () => {
  // slide에 사용될 컴포넌트를 담습니다.
  const sliderRef = useRef<SwiperRef>(null);

  // toss payments widget state
  const { data: paymentWidget } = usePaymentWidget(TOSS_WIDGET_CLIENT_KEY, ANONYMOUS);

  return (
    <>
      <Head>
        <title>MAGIC-POS : 주문</title>
      </Head>
      <section className={styles.container}>
        <article className={styles.children}>
          <Swiper
            modules={[Virtual]}
            spaceBetween={50}
            slidesPerView={1}
            virtual
            allowTouchMove={false}
            ref={sliderRef}
          >
            <SwiperSlide>
              <OrderTypeContainer />
            </SwiperSlide>
            <SwiperSlide>
              <MenuContainer />
            </SwiperSlide>
            <SwiperSlide>
              <CartContainer />
            </SwiperSlide>
            <SwiperSlide>
              <PaymentContainer paymentWidget={paymentWidget} />
            </SwiperSlide>
            <SwiperSlide>
              <SuccessContainer />
            </SwiperSlide>
          </Swiper>
        </article>
        <Footer sliderRef={sliderRef} paymentWidget={paymentWidget} />
      </section>
    </>
  );
};

export default OrderLayout;
