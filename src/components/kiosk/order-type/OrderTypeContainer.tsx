import ButtonContainer from '@/components/kiosk/order-type/ButtonContainer';
import styles from './styles/OrderTypeContainer.module.css';
import { useSwiper } from 'swiper/react';
import { MdOutlineLanguage } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import LanguageList from '@/components/kiosk/order-type/LanguageList';
import React, { useEffect, useRef, useState } from 'react';
import useKioskState, { goNextStep, ORDER_STEP, setIsOnlyTable, setOrderType, setStep } from '@/shared/store/kiosk';
import { useModal } from '@/hooks/service/ui/useModal';
import { IoInformationCircleOutline } from 'react-icons/io5';
import HelpModal from '@/components/kiosk/order-type/HelpModal';
import { SLIDE_MOVE_SPEED } from '@/components/layout/kiosk/footer/StepButton';
import OrderTypeHeader from '@/components/kiosk/order-type/OrderTypeHeader';

/**
 * STEP1: 포장 / 매장 선택
 * @constructor
 */
const OrderTypeContainer = () => {
  const [showLanguageList, setShowLanguageList] = useState(false);
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const tableId = useKioskState(state => state.tableId);
  const step = useKioskState(state => state.step);
  const menuData = useKioskState(state => state.menuData);
  const { i18n } = useTranslation();
  const languageRef = useRef<HTMLDivElement>(null);
  const [isListenAlert, setIsListenAlert] = useState(false);
  const { MagicModal } = useModal();
  const swiper = useSwiper();

  const handleClickLanguage = () => {
    setShowLanguageList(prev => !prev);
  };

  const handleClickHelp = () => {
    MagicModal.fire(<HelpModal />);
  };

  useEffect(() => {
    if (menuData && menuData.length > 0) {
      if (menuData[0].store.use_table) {
        setOrderType({ type: tableId ? 'store' : 'togo' });
        goNextStep();
        swiper.slideNext(SLIDE_MOVE_SPEED);
        setIsOnlyTable(true);
      }
    }

    if (step !== ORDER_STEP.CHOOSE_ORDER_TYPE) {
      swiper.slideTo(ORDER_STEP.SELECT_MENU);
      setStep(ORDER_STEP.SELECT_MENU);
    }
  }, []);

  useEffect(() => {
    try {
      if (Notification.permission === 'granted') {
        setIsListenAlert(true);
      }
    } catch (err) {
      setIsListenAlert(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutsideRef = (e: MouseEvent) => {
      if (languageRef && !languageRef.current!.contains(e.target as Node)) {
        setShowLanguageList(false);
      }
    };

    if (selectedLanguage) {
      i18n.changeLanguage(selectedLanguage.split('-')[1]);
    }

    window.addEventListener('click', handleClickOutsideRef);

    return () => {
      window.removeEventListener('click', handleClickOutsideRef);
    };
  }, []);

  return (
    <div className={styles.container}>
      <OrderTypeHeader />
      <ButtonContainer />
      <div className={styles.languageWrapper} ref={languageRef}>
        {showLanguageList && <LanguageList setShowLanguageList={setShowLanguageList} />}
        <MdOutlineLanguage size={20} onClick={handleClickLanguage} />
        <div className={styles.buttonContainer}>
          <button onClick={handleClickLanguage}>Language</button>
          {!isListenAlert && (
            <div onClick={handleClickHelp}>
              <div className={styles.balloon}>홈 화면에 등록하여 알림을 받아보세요.</div>
              <IoInformationCircleOutline size={8} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderTypeContainer;
