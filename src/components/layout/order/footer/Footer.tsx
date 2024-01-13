import React, { useEffect, useState } from 'react';
import styles from './styles/Footer.module.css';
import { SwiperRef } from 'swiper/react';
import StepButton from '@/components/layout/order/footer/StepButton';

interface FooterProps {
  sliderRef: React.RefObject<SwiperRef>;
}

const Footer = ({ sliderRef }: FooterProps) => {
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  return <footer className={styles.container}>{!isPageLoading && <StepButton sliderRef={sliderRef} />}</footer>;
};

export default Footer;
