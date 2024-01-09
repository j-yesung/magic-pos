import Head from 'next/head';
import React, { useRef } from 'react';
import styles from './styles/layout.module.css';
import Footer from '@/components/layout/order/Footer/Footer';
import OrderTypeContainer from '@/components/order/order-type/OrderTypeContainer';
import MenuContainer from '@/components/order/menu/MenuContainer';
import CartContainer from '@/components/order/cart/CartContainer';
import PaymentContainer from '@/components/order/payment/paymentContainer';
import CompleteContainer from '@/components/order/complete/CompleteContainer';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide, SwiperRef } from 'swiper/react';

/**
 * 일반인 KIOSK 레이아웃
 * @constructor
 */
const OrderLayout = () => {
  // slide에 사용될 컴포넌트를 담습니다.
  const slides = [OrderTypeContainer, MenuContainer, CartContainer, PaymentContainer, CompleteContainer];
  const sliderRef = useRef<SwiperRef>(null);

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
            {slides.map((slideContent, index) => (
              <SwiperSlide key={OrderTypeContainer.name} virtualIndex={index}>
                {slideContent}
              </SwiperSlide>
            ))}
          </Swiper>
        </article>
        <Footer sliderRef={sliderRef} />
      </section>
    </>
  );
};

export default OrderLayout;
