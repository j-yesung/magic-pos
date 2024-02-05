import styles from './styles/MenuCard.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import Image from 'next/image';
import useKioskState, { setIsOptionPage, setSelectedMenu } from '@/shared/store/kiosk';
import { SLIDE_MOVE_SPEED } from '@/components/layout/kiosk/footer/StepButton';
import { convertNumberToWon } from '@/shared/helper';
import { useTranslation } from 'next-i18next';

interface MenuCardProps {
  menu: MenuItemWithOption;
}

const MenuCard = ({ menu }: MenuCardProps) => {
  const optionSwiperRef = useKioskState(state => state.optionSwiperRef);
  const { i18n } = useTranslation();

  const handleClickCard = () => {
    if (menu.remain_ea === 0) return;
    setSelectedMenu(menu);
    setIsOptionPage(true);
    optionSwiperRef?.current?.swiper.slideNext(SLIDE_MOVE_SPEED);
  };

  return (
    <div className={styles.card} onClick={handleClickCard}>
      <Image src={menu.image_url ?? ''} alt={menu.name ?? ''} width={123} height={123} priority={true} />

      <div className={styles.menuInfo}>
        <span>{menu.name}</span>
        <span>{convertNumberToWon(menu.price, i18n.language === 'ko')}</span>
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
