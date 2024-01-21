import React from 'react';
import styles from './styles/MenuCard.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import Image from 'next/image';
import useOrderStore, { setIsOptionPage, setSelectedMenu } from '@/shared/store/order';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';
import { convertNumberToWon } from '@/shared/helper';

interface MenuCardProps {
  menu: MenuItemWithOption;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);

  const handleClickCard = () => {
    if (menu.remain_ea === 0) return;
    setSelectedMenu(menu);
    setIsOptionPage(true);
    optionSwiperRef?.current?.swiper.slideNext(SLIDE_MOVE_SPEED);
  };

  return (
    <div className={styles.card} onClick={handleClickCard}>
      <Image src={menu.image_url ?? ''} alt={menu.name ?? ''} width={125} height={125} priority={true} />
      <div className={styles.menuInfo}>
        <span>{menu.name}</span>
        <span>{convertNumberToWon(menu.price)}</span>
      </div>
      {menu.remain_ea === 0 && (
        <div className={styles.soldOut}>
          <p>소진 되었습니다</p>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
