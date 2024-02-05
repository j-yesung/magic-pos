import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import { convertNumberToWon } from '@/shared/helper';
import { Tables } from '@/types/supabase';
import MenuItemCardTxtOption from './CardTxtOption';

interface PropsType {
  item: Tables<'menu_item'>;
}

const MenuItemCardTxt = ({ item }: PropsType) => {
  return (
    <span className={styles['txt']}>
      <span className={styles['name']}>{item.name}</span>
      <span className={styles['price-wrap']}>
        <span className={styles['price']}>{convertNumberToWon(item.price)}</span>
        <span className={styles['remain-ea']}>수량 {item.remain_ea}</span>
      </span>
      <MenuItemCardTxtOption item={item} />
    </span>
  );
};

export default MenuItemCardTxt;
