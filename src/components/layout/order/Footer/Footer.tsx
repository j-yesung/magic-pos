import React from 'react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/footer.module.css';
import StepButtonContainer from '@/components/layout/order/Footer/StepButtonContainer';
import { SwiperRef } from 'swiper/react';

const Footer = ({ sliderRef }: { sliderRef: React.RefObject<SwiperRef> }) => {
  const { step } = useOrderStore();
  return (
    <footer className={styles.container}>
      <StepButtonContainer step={step} sliderRef={sliderRef} />
    </footer>
  );
};

export default Footer;
