import React, { ReactElement } from 'react';
import Layout from '@/components/layout/order/Layout';
import { NextPageWithLayout } from '@/types/common';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import OrderTypeContainer from '@/components/order/order-type/OrderTypeContainer';
import 'swiper/css';
import 'swiper/css/virtual';
import MenuContainer from '@/components/order/menu/MenuContainer';
import CartContainer from '@/components/order/cart/CartContainer';
import PaymentContainer from '@/components/order/payment/paymentContainer';
import CompleteContainer from '@/components/order/complete/CompleteContainer';

const OrderIndexPage: NextPageWithLayout = () => {
  const slides = [OrderTypeContainer, MenuContainer, CartContainer, PaymentContainer, CompleteContainer];

  return (
    <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={1} virtual allowTouchMove={false}>
      {slides.map((slideContent, index) => (
        <SwiperSlide key={OrderTypeContainer.name} virtualIndex={index}>
          {slideContent}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

OrderIndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default OrderIndexPage;
