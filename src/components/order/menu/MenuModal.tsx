import React, { useState } from 'react';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import styles from './styles/MenuModal.module.css';
import { convertNumberToWon } from '@/shared/helper';
import { useModal } from '@/hooks/modal/useModal';
import useOrderStore from '@/shared/store/order';

const MenuModal = ({ menu }: { menu: Tables<'menu_item'> }) => {
  const { MagicModal } = useModal();
  const [quantity, setQuantity] = useState(1);
  const { addOrderList } = useOrderStore();

  const handleClickUpQuantity = () => {
    setQuantity(prev => ++prev);
  };

  const handleClickDownQuantity = () => {
    setQuantity(prev => Math.max(prev - 1, 1));
  };

  const handleClickAddCart = () => {
    MagicModal.destroy();
    addOrderList(new Array(quantity).fill(false).map(() => menu));
  };

  return (
    <div className={styles.container}>
      <Image src={menu.image_url ?? ''} alt={menu.name ?? ''} width={300} height={300} className={styles.image} />
      <span className={styles.name}>{menu.name}</span>
      <span className={styles.price}>{convertNumberToWon(menu.price ?? 0)}</span>
      <div className={styles.quantity}>
        <button onClick={handleClickDownQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={handleClickUpQuantity}>+</button>
      </div>

      <button className={styles.addCartButton} onClick={handleClickAddCart}>
        담기
      </button>
    </div>
  );
};

export default MenuModal;
