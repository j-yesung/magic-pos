import React from 'react';
import styles from './styles/MenuCard.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import Image from 'next/image';
import useOrderStore from '@/shared/store/order';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';

interface MenuCardProps {
  menu: MenuItemWithOption;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const { optionSwiperRef, setSelectedMenu } = useOrderStore();

  const handleClickCard = () => {
    setSelectedMenu(menu);
    optionSwiperRef?.current?.swiper.slideNext(SLIDE_MOVE_SPEED);
  };

  return (
    <div className={styles.card} onClick={handleClickCard}>
      <Image src={menu.image_url ?? ''} alt={menu.name ?? ''} width={100} height={100} />
      <span>{menu.name}</span>
    </div>
  );
};

export default MenuCard;
