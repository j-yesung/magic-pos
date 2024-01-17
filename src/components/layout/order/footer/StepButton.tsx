import React from 'react';
import { SwiperRef } from 'swiper/react';
import useOrderStore, { getTotalPrice, goNextStep, ORDER_STEP } from '@/shared/store/order';
import { usePaymentWidget } from '@/hooks/order/usePaymentWidget';
import styles from './styles/StepButton.module.css';
import { convertNumberToWon } from '@/shared/helper';
import CartIcon from '@/components/icons/CartIcon';
import AddCartButton from '@/components/layout/order/footer/AddCartButton';

interface ButtonProps {
  sliderRef: React.RefObject<SwiperRef>;
}

export const SLIDE_MOVE_SPEED = 500;

const StepButton = ({ sliderRef }: ButtonProps) => {
  const orderList = useOrderStore(state => state.orderList);
  const step = useOrderStore(state => state.step);
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);
  const selectedMenu = useOrderStore(state => state.selectedMenu);

  const { paymentWidget, handlePaymentRequest } = usePaymentWidget();

  const BUTTON_OPTIONS: { [key: number]: string } = {
    1: convertNumberToWon(getTotalPrice(orderList)),
    2: '결제 하러 이동',
    3: '결제 하기',
  };

  const nextClickHandler = async () => {
    if (step === ORDER_STEP.PAYMENT && paymentWidget) {
      await handlePaymentRequest(orderList);
    } else {
      sliderRef.current!.swiper.slideNext(SLIDE_MOVE_SPEED);
      goNextStep();
    }
  };

  return (
    <>
      {step > ORDER_STEP.CHOOSE_ORDER_TYPE && (
        <div className={styles.container}>
          {optionSwiperRef?.current!.swiper?.realIndex !== 1 ? (
            <button className={styles.button} onClick={nextClickHandler} disabled={orderList.length === 0}>
              <span>{BUTTON_OPTIONS[step]}</span>
              {step === ORDER_STEP.SELECT_MENU && (
                <div className={styles.iconWrapper}>
                  <CartIcon amount={orderList.length} />
                </div>
              )}
            </button>
          ) : (
            <AddCartButton menu={selectedMenu} />
          )}
        </div>
      )}
    </>
  );
};

export default StepButton;
