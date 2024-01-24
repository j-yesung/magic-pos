import ButtonContainer from '@/components/kiosk/order-type/ButtonContainer';
import styles from './styles/OrderTypeContainer.module.css';
import { MdOutlineLanguage } from 'react-icons/md';

/**
 * STEP1: 포장 / 매장 선택
 * @constructor
 */
const OrderTypeContainer = () => {
  return (
    <div className={styles.container}>
      <h1>
        매장식사 또는 <br />
        포장을 선택해 주세요.
      </h1>
      <ButtonContainer />
      <div className={styles.languageWrapper}>
        <MdOutlineLanguage size={20} />
        <span>Language</span>
      </div>
    </div>
  );
};

export default OrderTypeContainer;
