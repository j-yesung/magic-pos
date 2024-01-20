import React, { useEffect } from 'react';
import styles from './styles/CartAlertModal.module.css';
import { FaCheck } from 'react-icons/fa6';
import { useModal } from '@/hooks/modal/useModal';

const CartAlertModal = ({ modalId }: { modalId: string }) => {
  const { MagicModal } = useModal();

  useEffect(() => {
    setTimeout(() => {
      MagicModal.hide(modalId);
    }, 700);
  }, []);

  return (
    <div className={styles.container}>
      <FaCheck size={40} />
      <p>상품을 장바구니에 담았어요</p>
    </div>
  );
};

export default CartAlertModal;
