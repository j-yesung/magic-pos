import React from 'react';
import useOrderStore from '@/shared/store/order';
import styles from './styles/footer.module.css';
import StepButtonContainer from '@/components/layout/order/Footer/StepButtonContainer';
import { SwiperRef } from 'swiper/react';
import { PaymentWidgetInstance } from '@tosspayments/payment-widget-sdk';

interface FooterProps {
  sliderRef: React.RefObject<SwiperRef>;
  paymentWidget: PaymentWidgetInstance | undefined;
}

const Footer = ({ sliderRef, paymentWidget }: FooterProps) => {
  const { step } = useOrderStore();
  return (
    <footer className={styles.container}>
      <StepButtonContainer step={step} sliderRef={sliderRef} paymentWidget={paymentWidget} />
    </footer>
  );
};

export default Footer;
