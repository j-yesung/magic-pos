import React, { useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import MenuCategoryContainer from '@/components/order/menu/MenuCategoryContainer';
import styles from './styles/MenuContainer.module.css';
import MenuCard from '@/components/order/menu/MenuCard';
import { Tables } from '@/types/supabase';

/**
 * STEP2: 메뉴 탐색 및 선택
 * @constructor
 */
const MenuContainer = () => {
  const { menuData } = useOrderStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [menuItemList, setMenuItemList] = useState<Tables<'menu_item'>[]>([]);

  useEffect(() => {
    if (menuData && menuData.length > 0) {
      const list = menuData.find(m => m.id === selectedCategory);
      if (list) setMenuItemList(list.menu_item);
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (menuData && menuData.length > 0) {
      setSelectedCategory(menuData[0].id);
    }
  }, []);

  // TODO: 에러 어떻게 띄울까?

  return (
    <div>
      {menuData && (
        <MenuCategoryContainer
          menuData={menuData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <section className={styles.section}>
        {menuItemList.map(menu => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </section>
    </div>
  );
};

export default MenuContainer;
