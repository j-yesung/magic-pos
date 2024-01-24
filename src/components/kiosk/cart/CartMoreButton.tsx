import styles from './styles/CartMoreButton.module.css';
import { HiOutlinePlus } from 'react-icons/hi2';

const CartMoreButton = () => {
  return (
    <div className={styles.container}>
      <HiOutlinePlus size={20} />
      <span>더 담으러 가기</span>
    </div>
  );
};

export default CartMoreButton;
