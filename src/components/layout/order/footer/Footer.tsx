import React, { useEffect, useState } from 'react';
import styles from './styles/Footer.module.css';
import { SwiperRef } from 'swiper/react';
import StepButton from '@/components/layout/order/footer/StepButton';
import useOrderStore from '@/shared/store/order';

interface FooterProps {
  sliderRef: React.RefObject<SwiperRef>;
}

const Footer = ({ sliderRef }: FooterProps) => {
  const { step } = useOrderStore();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <>
      {step > 0 && (
        <footer className={styles.container}>{!isPageLoading && <StepButton sliderRef={sliderRef} />}</footer>
      )}
    </>
  );
};

export default Footer;
