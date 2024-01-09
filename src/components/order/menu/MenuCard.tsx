import React from 'react';
import styles from './styles/MenuCard.module.css';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import { useModal } from '@/hooks/modal/useModal';
import MenuModal from '@/components/order/menu/MenuModal';

interface MenuCardProps {
  menu: Tables<'menu_item'>;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const { MagicModal } = useModal();

  const handleClickCard = () => {
    MagicModal.fire(<MenuModal menu={menu} />);
  };

  return (
    <div className={styles.card} onClick={handleClickCard}>
      <Image src={menu.image_url ?? ''} alt={menu.name ?? ''} width={100} height={100} />
      <span>{menu.name}</span>
    </div>
  );
};

export default MenuCard;
