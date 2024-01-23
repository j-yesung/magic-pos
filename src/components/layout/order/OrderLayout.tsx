import Head from 'next/head';
import { useEffect, useRef } from 'react';
import styles from './styles/OrderLayout.module.css';
import Footer from '@/components/layout/order/footer/Footer';
import { SwiperRef } from 'swiper/react';
import useKioskState, { ORDER_STEP, setSwiperRef } from '@/shared/store/kiosk';
import { useRouter } from 'next/router';
import OrderPrevButton from '@/components/layout/order/OrderPrevButton';

const DONT_RENDER_FOOTER_PATH_LIST = ['/kiosk/success', '/kiosk/receipt', '/kiosk/fail'];
/**
 * 일반인 KIOSK 레이아웃
 * @constructor
 */
const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  // slide에 사용될 컴포넌트를 담습니다.
  const step = useKioskState(state => state.step);
  const sliderRef = useRef<SwiperRef>(null);
  const { pathname } = useRouter();

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
          {step > ORDER_STEP.CHOOSE_ORDER_TYPE && step < ORDER_STEP.SUCCESS && <OrderPrevButton />}
          {children}
        </article>
        {!DONT_RENDER_FOOTER_PATH_LIST.includes(pathname) && <Footer />}
      </section>
    </>
  );
};

export default OrderLayout;
