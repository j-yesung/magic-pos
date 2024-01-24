import { useSwiper } from 'swiper/react';
import { goNextStep, setOrderType } from '@/shared/store/kiosk';
import styles from './styles/OrderTypeButton.module.css';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';
import { MdOutlineTableBar } from 'react-icons/md';
import { TbPaperBag } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';

const OrderTypeCard = ({ order }: { order: OrderType }) => {
  const swiper = useSwiper();
  const { t } = useTranslation();

  const clickButtonHandler = () => {
    setOrderType(order);
    goNextStep();
    swiper.slideNext(SLIDE_MOVE_SPEED);
  };

  return (
    <div className={styles.wrapper} onClick={clickButtonHandler}>
      <div className={styles.iconWrapper}>
        {order.type === 'togo' ? <TbPaperBag size={31} /> : <MdOutlineTableBar size={31} />}
      </div>
      <span>{order.type === 'togo' ? t('order-type.togo') : t('order-type.store')}</span>
    </div>
  );
};

export default OrderTypeCard;
