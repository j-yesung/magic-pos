import React, { useEffect, useState } from 'react';
import styles from './styles/Footer.module.css';
import { SwiperRef } from 'swiper/react';
import StepButton from '@/components/layout/order/footer/StepButton';
import useOrderState, { ORDER_STEP } from '@/shared/store/order';

interface FooterProps {
  sliderRef: React.RefObject<SwiperRef>;
}

const Footer = ({ sliderRef }: FooterProps) => {
  const step = useOrderState(state => state.step);
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      {step > ORDER_STEP.CHOOSE_ORDER_TYPE && (
        <footer className={styles.container}>{!isPageLoading && <StepButton sliderRef={sliderRef} />}</footer>
      )}
    </>
  );
};

export default Footer;
