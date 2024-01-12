import React from 'react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/Footer.module.css';
import StepButtonContainer from '@/components/layout/order/footer/StepButtonContainer';
import { SwiperRef } from 'swiper/react';

interface FooterProps {
  sliderRef: React.RefObject<SwiperRef>;
}

const Footer = ({ sliderRef }: FooterProps) => {
  const { step } = useOrderStore();
  return (
    <footer className={styles.container}>
      <StepButtonContainer step={step} sliderRef={sliderRef} />
    </footer>
  );
};

export default Footer;
