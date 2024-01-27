import styles from './style/MenuHeader.module.css';
import useKioskState, { ORDER_STEP } from '@/shared/store/kiosk';
import { useTranslation } from 'next-i18next';

const MenuHeader = () => {
  const step = useKioskState(state => state.step);
  const storeName = useKioskState(state => state.storeName);
  const { t } = useTranslation();

  const TITLE: { [key in number]: string } = {
    [ORDER_STEP.CHECK_MENU]: t('header.cart'),
    [ORDER_STEP.PAYMENT]: t('header.payment'),
    [ORDER_STEP.SUCCESS]: t('header.success'),
    [ORDER_STEP.RECEIPT]: t('header.receipt'),
  };

  return (
    <header className={styles.container}>
      {step === ORDER_STEP.RECEIPT && <h1>{storeName}</h1>}
      {step !== ORDER_STEP.RECEIPT && <div>{TITLE[step]}</div>}
    </header>
  );
};

export default MenuHeader;
