import React, { ReactElement } from 'react';
import Layout from '@/components/layout/order/Layout';
import { NextPageWithLayout } from '@/types/common';
import { Virtual } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import StepOneContainer from '@/components/order/step1/StepOneContainer';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/virtual';

const OrderIndexPage: NextPageWithLayout = () => {
  const slides = [StepOneContainer];

  return (
    <Swiper modules={[Virtual]} spaceBetween={50} slidesPerView={1} virtual allowTouchMove={false}>
      {slides.map((slideContent, index) => (
        <SwiperSlide key={StepOneContainer.name} virtualIndex={index}>
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
