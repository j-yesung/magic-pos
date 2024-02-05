import styles from './styles/CartMoreButton.module.css';
import { HiOutlinePlus } from 'react-icons/hi2';
import { useTranslation } from 'next-i18next';
import useKioskState, { goPrevStep } from '@/shared/store/kiosk';
import { SLIDE_MOVE_SPEED } from '@/components/layout/kiosk/footer/StepButton';

const CartMoreButton = () => {
  const { t } = useTranslation();
  const swiperRef = useKioskState(state => state.swiperRef);

  const clickPrevButtonHandler = () => {
    swiperRef?.current?.swiper.slidePrev(SLIDE_MOVE_SPEED);
    setTimeout(() => {
      goPrevStep();
    }, SLIDE_MOVE_SPEED);
  };

  return (
    <div className={styles.container} onClick={clickPrevButtonHandler}>
      <HiOutlinePlus size={20} />
      <span>{t('add-more')}</span>
    </div>
  );
};

export default CartMoreButton;
