import React, { useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import MenuCategoryContainer from '@/components/order/menu/MenuCategoryContainer';
import styles from './styles/MenuContainer.module.css';
import MenuCard from '@/components/order/menu/MenuCard';
import { Tables } from '@/types/supabase';
import MessageBox from '@/components/order/cart/MessageBox';

/**
 * STEP2: 메뉴 탐색 및 선택
 * @constructor
 */
const MenuContainer = () => {
  const { menuData, orderType } = useOrderStore();
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

  return (
    <div className={styles.container}>
      {menuData && (
        <MenuCategoryContainer
          menuData={menuData}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      )}
      <div className={styles.storeInfo}>
        <div className={styles.orderType}>
          <span>{orderType.type === 'togo' ? '포장' : '매장'}</span>
        </div>
        <span className={styles.storeName}>어쩌구카페 가산그레이트점</span>
      </div>
      <section className={styles.section}>
        {menuItemList.map(menu => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </section>
      <div className={styles.messageBox}>
        <MessageBox />
      </div>
    </div>
  );
};

export default MenuContainer;
