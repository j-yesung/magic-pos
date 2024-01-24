import styles from './style/MenuHeader.module.css';
import useKioskState, { ORDER_STEP } from '@/shared/store/kiosk';

const TITLE: { [key in number]: string } = {
  [ORDER_STEP.CHECK_MENU]: '장바구니',
  [ORDER_STEP.PAYMENT]: '결제 하기',
  [ORDER_STEP.SUCCESS]: '주문 완료',
  [ORDER_STEP.RECEIPT]: '주문 확인',
};

const MenuHeader = () => {
  const step = useKioskState(state => state.step);
  const storeName = useKioskState(state => state.storeName);

  return (
    <header className={styles.container}>
      {step === ORDER_STEP.RECEIPT && <h1>{storeName}</h1>}
      {step !== ORDER_STEP.RECEIPT && <div>{TITLE[step]}</div>}
    </header>
  );
};

export default MenuHeader;
