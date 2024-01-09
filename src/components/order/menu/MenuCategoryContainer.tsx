import React, { Dispatch, SetStateAction } from 'react';
import { CategoryWithMenuItem } from '@/types/supabase';
import styles from './styles/MenuCategoryContainer.module.css';
import MenuCategory from '@/components/order/menu/MenuCategory';

interface MenCategoryContainerProps {
  menuData: CategoryWithMenuItem;
  setSelectedCategory: Dispatch<SetStateAction<string | null>>;
  selectedCategory: string | null;
}

const MenuCategoryContainer = ({ menuData, selectedCategory, setSelectedCategory }: MenCategoryContainerProps) => {
  return (
    <div className={styles.container}>
      {menuData.map(category => (
        <MenuCategory
          key={category.id}
          category={category}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      ))}
    </div>
  );
};

export default MenuCategoryContainer;
