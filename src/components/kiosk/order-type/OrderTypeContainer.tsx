import ButtonContainer from '@/components/kiosk/order-type/ButtonContainer';
import styles from './styles/OrderTypeContainer.module.css';
import { MdOutlineLanguage } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import LanguageList from '@/components/kiosk/order-type/LanguageList';
import React, { useEffect, useRef, useState } from 'react';
import useKioskState from '@/shared/store/kiosk';
import { useModal } from '@/hooks/service/ui/useModal';
import { IoInformationCircleOutline } from 'react-icons/io5';
import HelpModal from '@/components/kiosk/order-type/HelpModal';
import TranslateLoading from '@/components/kiosk/order-type/TranslateLoading';
import clsx from 'clsx';

/**
 * STEP1: 포장 / 매장 선택
 * @constructor
 */
const OrderTypeContainer = () => {
  const [showLanguageList, setShowLanguageList] = useState(false);
  const selectedLanguage = useKioskState(state => state.selectedLanguage);
  const menuData = useKioskState(state => state.menuData);
  const { t, i18n } = useTranslation();
  const languageRef = useRef<HTMLDivElement>(null);
  const [isListenAlert, setIsListenAlert] = useState(false);
  const { MagicModal } = useModal();
  const [isTranslating, setIsTranslating] = useState(false);

  const handleClickLanguage = () => {
    setShowLanguageList(prev => !prev);
  };

  const handleClickHelp = () => {
    MagicModal.fire(<HelpModal />);
  };

  useEffect(() => {
    setIsTranslating(false);
  }, [menuData]);

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
    <>
      {isTranslating && <TranslateLoading />}
      <div
        className={clsx(styles.container, {
          [styles.blur]: isTranslating,
        })}
      >
        <h1>
          {t('order-type.title-1')} <br />
          {t('order-type.title-2')}
        </h1>
        <ButtonContainer />
        <div className={styles.languageWrapper} ref={languageRef}>
          {showLanguageList && (
            <LanguageList setShowLanguageList={setShowLanguageList} setIsTranslating={setIsTranslating} />
          )}
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
    </>
  );
};

export default OrderTypeContainer;
