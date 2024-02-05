import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import useMenuOptionStore from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';

interface PropsType {
  item: Tables<'menu_item'>;
}

const MenuItemCardTxtOption = ({ item }: PropsType) => {
  const origineMenuOptions = useMenuOptionStore(state => state.origineMenuOptions);

  return (
    <span className={styles['option']}>
      {origineMenuOptions
        .filter(options => options.menu_id === item.id)
        .map((option: Tables<'menu_option'>) => (
          <span key={option.id}>
            <span>{option.name}</span>
          </span>
        ))}
    </span>
  );
};

export default MenuItemCardTxtOption;
