import React, { useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import MenuCategoryContainer from '@/components/order/menu/MenuCategoryContainer';
import styles from './styles/MenuContainer.module.css';
import MenuCard from '@/components/order/menu/MenuCard';
import { MenuItemWithOption } from '@/types/supabase';
import StoreInfo from '@/components/order/common/StoreInfo';

/**
 * STEP2: 메뉴 탐색 및 선택
 * @constructor
 */
const MenuContainer = () => {
  const { menuData, orderType, storeName } = useOrderStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [menuItemList, setMenuItemList] = useState<MenuItemWithOption[]>([]);

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

  return (
    <div className={styles.container}>
      {menuData && (
        <MenuCategoryContainer
          menuData={menuData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <StoreInfo orderType={orderType} storeName={storeName} />
      <section className={styles.section}>
        {menuItemList.map(menu => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </section>
    </div>
  );
};

export default MenuContainer;
