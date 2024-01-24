import ButtonContainer from '@/components/kiosk/order-type/ButtonContainer';
import styles from './styles/OrderTypeContainer.module.css';
import { MdOutlineLanguage } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import LanguageList from '@/components/kiosk/order-type/LanguageList';
import { useEffect, useRef, useState } from 'react';

/**
 * STEP1: 포장 / 매장 선택
 * @constructor
 */
const OrderTypeContainer = () => {
  const [showLanguageList, setShowLanguageList] = useState(false);
  const { t } = useTranslation();
  const languageRef = useRef<HTMLDivElement>(null);

  const handleClickLanguage = () => {
    setShowLanguageList(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutsideRef = (e: MouseEvent) => {
      if (languageRef && !languageRef.current!.contains(e.target as Node)) {
        setShowLanguageList(false);
      }
    };

    window.addEventListener('click', handleClickOutsideRef);

    return () => {
      window.removeEventListener('click', handleClickOutsideRef);
    };
  }, []);

  return (
    <div className={styles.container}>
      <h1>
        {t('order-type-title-1')} <br />
        {t('order-type-title-2')}
      </h1>
      <ButtonContainer />
      <div className={styles.languageWrapper} ref={languageRef}>
        {showLanguageList && <LanguageList />}
        <MdOutlineLanguage size={20} onClick={handleClickLanguage} />
        <button onClick={handleClickLanguage}>Language</button>
      </div>
    </div>
  );
};

export default OrderTypeContainer;
