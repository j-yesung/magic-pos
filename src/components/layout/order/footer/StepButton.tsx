import React from 'react';
import { SwiperRef } from 'swiper/react';
import useOrderStore, { getTotalPrice, goNextStep, ORDER_STEP, subtractOrderList } from '@/shared/store/order';
import { usePaymentWidget } from '@/hooks/order/usePaymentWidget';
import styles from './styles/StepButton.module.css';
import { convertNumberToWon } from '@/shared/helper';
import AddCartButton from '@/components/layout/order/footer/AddCartButton';
import { IoCart } from 'react-icons/io5';
import { readRemainEaByMenuId } from '@/server/api/supabase/menu-item';
import { useModal } from '@/hooks/modal/useModal';
import { PiBagSimpleFill } from 'react-icons/pi';

class OrderError extends Error {
  readonly id: string;
  constructor(message: string, id: string) {
    super(message);
    this.message = message;
    this.id = id;
  }
}

interface ButtonProps {
  sliderRef: React.RefObject<SwiperRef>;
}

export const SLIDE_MOVE_SPEED = 500;

const StepButton = ({ sliderRef }: ButtonProps) => {
  const orderList = useOrderStore(state => state.orderList);
  const step = useOrderStore(state => state.step);
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);
  const swiperRef = useOrderStore(state => state.swiperRef);
  const selectedMenu = useOrderStore(state => state.selectedMenu);
  const { MagicModal } = useModal();

  const { paymentWidget, handlePaymentRequest } = usePaymentWidget();

  const BUTTON_OPTIONS: { [key: number]: string } = {
    1: convertNumberToWon(getTotalPrice(orderList)),
    2: '결제 하러 이동',
    3: '결제 하기',
  };

  const nextClickHandler = async () => {
    if (step === ORDER_STEP.PAYMENT && paymentWidget) {
      // 결제 전에 남은 수량이 있는지 다시 한번 검사한다.
      const fetchRemainEaList = orderList.map(
        order =>
          new Promise((res, rej) => {
            readRemainEaByMenuId(order.id).then(result => {
              if (result.remain_ea === 0) rej(new OrderError(`${result.name}이 품절 되었습니다. 😭`, result.id));
              else res(result.remain_ea);
            });
          }),
      );
      try {
        await Promise.all(fetchRemainEaList);
      } catch (err) {
        MagicModal.alert({ content: (err as OrderError).message, showButton: true });
        subtractOrderList((err as OrderError).id);
        swiperRef?.current!.swiper.slidePrev(SLIDE_MOVE_SPEED);
        return;
      }

      // 검사가 통과 되면 결제 진해행
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
                  <PiBagSimpleFill size={20} />
                  <span>{orderList.length}</span>
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
