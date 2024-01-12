import React, { useEffect, useState } from 'react';
import styles from './styles/Footer.module.css';
import StepButtonContainer from '@/components/layout/order/footer/StepButtonContainer';
import { SwiperRef } from 'swiper/react';

interface FooterProps {
  sliderRef: React.RefObject<SwiperRef>;
}

const Footer = ({ sliderRef }: FooterProps) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return (
    <footer className={styles.container}>{!isPageLoading && <StepButtonContainer sliderRef={sliderRef} />}</footer>
  );
};

export default Footer;
