import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/OrderLayout.module.css';
import Footer from '@/components/layout/kiosk/footer/Footer';
import { SwiperRef } from 'swiper/react';
import useKioskState, { ORDER_STEP, setSwiperRef } from '@/shared/store/kiosk';
import { useRouter } from 'next/router';
import OrderPrevButton from '@/components/layout/kiosk/OrderPrevButton';
import { makeTitle } from '@/shared/helper';
import { PAYMENT_FAIL_PATH, PAYMENT_SUCCESS_PATH, RECEIPT_PATH } from '@/data/url-list';

const DONT_RENDER_FOOTER_PATH_LIST = [PAYMENT_FAIL_PATH, RECEIPT_PATH, PAYMENT_SUCCESS_PATH];
/**
 * 일반인 KIOSK 레이아웃
 * @constructor
 */
const OrderLayout = ({ children }: { children: React.ReactNode }) => {
  // slide에 사용될 컴포넌트를 담습니다.
  const step = useKioskState(state => state.step);
  const isOnlyTable = useKioskState(state => state.isOnlyTable);
  const isOptionPage = useKioskState(state => state.isOptionPage);
  const sliderRef = useRef<SwiperRef>(null);
  const [condition, setCondition] = useState<boolean[]>([]);
  const { pathname } = useRouter();

  useEffect(() => {
    setCondition([
      step <= ORDER_STEP.CHOOSE_ORDER_TYPE,
      step >= ORDER_STEP.SUCCESS,
      step === ORDER_STEP.SELECT_MENU && isOnlyTable && !isOptionPage,
      pathname === PAYMENT_FAIL_PATH,
    ]);
  }, [step, isOptionPage]);

  useEffect(() => {
    setSwiperRef(sliderRef);
  }, []);

  return (
    <>
      <Head>
        <title>{makeTitle('주문')}</title>
      </Head>
      <section className={styles.container}>
        <article className={styles.children}>
          {!condition.some(c => c) && <OrderPrevButton />}
          {children}
        </article>
        {!DONT_RENDER_FOOTER_PATH_LIST.includes(pathname) && <Footer />}
      </section>
    </>
  );
};

export default OrderLayout;
