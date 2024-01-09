import React from 'react';
import styles from './styles/MenuCard.module.css';
import { Tables } from '@/types/supabase';
import Image from 'next/image';

interface MenuCardProps {
  menu: Tables<'menu_item'>;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  return (
    <div className={styles.card}>
      <Image src={menu.image_url ?? ''} alt={menu.name ?? ''} width={300} height={300} />
      <span>{menu.name}</span>
    </div>
  );
};

export default MenuCard;
