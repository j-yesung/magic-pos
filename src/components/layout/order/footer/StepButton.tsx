import { ReactElement } from 'react';
import useKioskState, { getTotalPrice, goNextStep, ORDER_STEP, subtractOrderList } from '@/shared/store/kiosk';
import { usePaymentWidget } from '@/hooks/query/order/usePaymentWidget';
import styles from './styles/StepButton.module.css';
import { convertNumberToWon } from '@/shared/helper';
import AddCartButton from '@/components/layout/order/footer/AddCartButton';
import { readRemainEaByMenuId } from '@/server/api/supabase/menu-item';
import { useModal } from '@/hooks/service/ui/useModal';
import { PiBagSimpleFill } from 'react-icons/pi';
import { BiSolidCircle } from 'react-icons/bi';
import { useTranslation } from 'react-i18next';
import LoadingSpinner from '@/components/common/LoadingSpinner';

class OrderError extends Error {
  readonly id: string;
  constructor(message: string, id: string) {
    super(message);
    this.message = message;
    this.id = id;
  }
}

export const SLIDE_MOVE_SPEED = 500;

const StepButton = () => {
  const orderList = useKioskState(state => state.orderList);
  const step = useKioskState(state => state.step);
  const optionSwiperRef = useKioskState(state => state.optionSwiperRef);
  const swiperRef = useKioskState(state => state.swiperRef);
  const selectedMenu = useKioskState(state => state.selectedMenu);
  const isWidgetRendering = useKioskState(state => state.isWidgetRendering);
  const { MagicModal } = useModal();
  const { t } = useTranslation();

  const { paymentWidget, handlePaymentRequest } = usePaymentWidget();

  const BUTTON_OPTIONS: { [key: number]: ReactElement } = {
    1: <>{convertNumberToWon(getTotalPrice(orderList))}</>,
    2: (
      <>
        {convertNumberToWon(getTotalPrice(orderList))} {<BiSolidCircle size={2} />} {t('footer.payment')}
      </>
    ),
    3: (
      <>
        {convertNumberToWon(getTotalPrice(orderList))} {<BiSolidCircle size={2} />} {t('footer.payment')}
      </>
    ),
  };

  const nextClickHandler = async () => {
    if (step === ORDER_STEP.PAYMENT && paymentWidget) {
      // 결제 전에 남은 수량이 있는지 다시 한번 검사한다.
      const fetchRemainEaList = orderList.map(
        order =>
          new Promise((res, rej) => {
            readRemainEaByMenuId(order.id).then(result => {
              if (result.remain_ea === 0) rej(new OrderError(`${result.name} ${t('sold-out')} 😭`, result.id));
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
      swiperRef?.current!.swiper.slideNext(SLIDE_MOVE_SPEED);
      goNextStep();
    }
  };

  return (
    <>
      {step > ORDER_STEP.CHOOSE_ORDER_TYPE && step < ORDER_STEP.SUCCESS && (
        <div className={styles.container}>
          {optionSwiperRef?.current!.swiper?.realIndex !== 1 ? (
            <button
              className={styles.button}
              onClick={nextClickHandler}
              disabled={orderList.length === 0 || (step === ORDER_STEP.PAYMENT && isWidgetRendering)}
            >
              {orderList.length === 0 ? (
                <span>{t('footer.no-item')}</span>
              ) : (
                <span>
                  {step === ORDER_STEP.PAYMENT && isWidgetRendering && (
                    <LoadingSpinner boxSize={2} ballSize={0.4} interval={1.5} />
                  )}
                  {BUTTON_OPTIONS[step]}
                  {step === ORDER_STEP.SELECT_MENU && (
                    <>
                      <BiSolidCircle size={2} />
                      <div className={styles.iconWrapper}>
                        <PiBagSimpleFill size={20} />
                        <span>{orderList.length}</span>
                      </div>
                    </>
                  )}
                </span>
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
