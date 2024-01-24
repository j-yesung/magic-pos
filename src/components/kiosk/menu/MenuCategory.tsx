import { Dispatch, SetStateAction } from 'react';
import styles from './styles/MenuCategory.module.css';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';

interface MenuCategoryProps {
  category: Pick<Tables<'menu_category'>, 'id' | 'name'>;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  selectedCategory: string | null;
}

const MenuCategory = ({ category, setSelectedCategory, selectedCategory }: MenuCategoryProps) => {
  const handleSetSelectedCategory = () => {
    setSelectedCategory(category.id);
  };

  return (
    <div
      className={clsx(styles.button, category.id === selectedCategory && styles.selected)}
      onClick={handleSetSelectedCategory}
    >
      {category.name}
    </div>
  );
};

export default MenuCategory;
