import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import { Tables } from '@/types/supabase';
import Image from 'next/image';
import Default from '/public/whiteLogo.svg';

interface PropsType {
  item: Tables<'menu_item'>;
}

const MenuItemCardImg = ({ item }: PropsType) => {
  return (
    <span className={styles['img']}>
      {item.image_url ? (
        <Image src={item.image_url} alt={item.name ?? 'Sample Image'} width={100} height={100} />
      ) : (
        <Default width={80} height={30} />
      )}
    </span>
  );
};

export default MenuItemCardImg;
