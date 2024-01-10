import React, { useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import MenuCategoryContainer from '@/components/order/menu/MenuCategoryContainer';
import styles from './styles/MenuContainer.module.css';
import MenuCard from '@/components/order/menu/MenuCard';
import { Tables } from '@/types/supabase';
import { convertNumberToWon } from '@/shared/helper';

/**
 * STEP2: 메뉴 탐색 및 선택
 * @constructor
 */
const MenuContainer = () => {
  const { menuData, orderList } = useOrderStore();
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
      <div className={styles.messageBox}>
        {orderList.length > 0 && (
          <>
            <span>
              {orderList[0].name} {orderList.length > 1 && `외 ${orderList.length - 1}개`}
            </span>
            <span>{convertNumberToWon(orderList.reduce((acc, cur) => acc + cur.price, 0))}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuContainer;
