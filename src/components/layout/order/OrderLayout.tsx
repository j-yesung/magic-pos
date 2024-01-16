import Head from 'next/head';
import React, { useEffect, useRef } from 'react';
import styles from './styles/OrderLayout.module.css';
import Footer from '@/components/layout/order/footer/Footer';
import { SwiperRef } from 'swiper/react';
import useOrderStore, { ORDER_STEP } from '@/shared/store/order';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';
import { useRouter } from 'next/router';

const DONT_RENDER_FOOTER_PATH_LIST = ['/order/success', '/order/receipt', '/order/fail'];
/**
 * 일반인 KIOSK 레이아웃
 * @constructor
 */
const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  // slide에 사용될 컴포넌트를 담습니다.
  const { setSwiperRef, step, goPrevStep, optionSwiperRef, setSelectedMenu } = useOrderStore();
  const sliderRef = useRef<SwiperRef>(null);
  const { pathname } = useRouter();

  const clickPrevButtonHandler = () => {
    if (optionSwiperRef?.current?.swiper?.activeIndex === ORDER_STEP.SELECT_MENU) {
      optionSwiperRef.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
      setSelectedMenu(null);
    } else {
      sliderRef!.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
      goPrevStep();
    }
  };

  useEffect(() => {
    setSwiperRef(sliderRef);
  }, []);

  return (
    <>
      <Head>
        <title>MAGIC-POS : 주문</title>
      </Head>
      <section className={styles.container}>
        <article className={styles.children}>
          {step > ORDER_STEP.CHOOSE_ORDER_TYPE && (
            <button className={styles.prevButton} onClick={clickPrevButtonHandler}>
              ⬅️{' '}
            </button>
          )}
          {children}
        </article>
        {!DONT_RENDER_FOOTER_PATH_LIST.includes(pathname) && <Footer sliderRef={sliderRef} />}
      </section>
    </>
  );
};

export default OrderLayout;
