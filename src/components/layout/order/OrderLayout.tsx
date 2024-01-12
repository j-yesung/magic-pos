import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import styles from './styles/OrderLayout.module.css';
import Footer from '@/components/layout/order/footer/Footer';

import { SwiperRef } from 'swiper/react';
import useOrderStore from '@/shared/store/order';

/**
 * 일반인 KIOSK 레이아웃
 * @constructor
 */
const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  // slide에 사용될 컴포넌트를 담습니다.
  const setSwiperRef = useOrderStore(state => state.setSwiperRef);
  const sliderRef = useRef<SwiperRef>(null);

  useEffect(() => {
    setSwiperRef(sliderRef);
  }, []);

  return (
    <>
      <Head>
        <title>MAGIC-POS : 주문</title>
      </Head>
      <section className={styles.container}>
        <article className={styles.children}>{children}</article>
        <Footer sliderRef={sliderRef} />
      </section>
    </>
  );
};

export default OrderLayout;
