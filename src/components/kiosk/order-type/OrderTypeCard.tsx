import { useSwiper } from 'swiper/react';
import { goNextStep, setOrderType } from '@/shared/store/kiosk';
import styles from './styles/OrderTypeButton.module.css';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';
import { MdOutlineTableBar } from 'react-icons/md';
import { TbPaperBag } from 'react-icons/tb';
import { useTranslation } from 'react-i18next';
import useToast from '@/hooks/service/ui/useToast';

const OrderTypeCard = ({ order }: { order: OrderType }) => {
  const swiper = useSwiper();
  const { t } = useTranslation();
  const { toast } = useToast();

  const clickButtonHandler = () => {
    if (Notification.permission !== 'granted') {
      toast('알림을 허용해주어야 주문 완료 메시지를 받을 수 있습니다!', {
        type: 'info',
        position: 'top-center',
        autoClose: 4000,
      });
    }

    Notification.requestPermission().then(permission => {
      if (permission !== 'granted') {
        // 푸시 거부됐을 때 처리할 내용
        console.log('푸시 거부됨');
      } else {
        // 푸시 승인됐을 때 처리할 내용
        console.log('푸시 승인됨');
      }
    });

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
