import { useEffect, useState } from 'react';
import useKioskState from '@/shared/store/kiosk';
import MenuCategoryContainer from '@/components/kiosk/menu/MenuCategoryContainer';
import styles from './styles/MenuContainer.module.css';
import MenuCard from '@/components/kiosk/menu/MenuCard';
import { MenuItemWithOption } from '@/types/supabase';
import StoreInfo from '@/components/kiosk/common/StoreInfo';

/**
 * STEP2: 메뉴 탐색 및 선택
 * @constructor
 */
const MenuContainer = () => {
  const menuData = useKioskState(state => state.menuData);
  const orderType = useKioskState(state => state.orderType);
  const storeName = useKioskState(state => state.storeName);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [menuItemList, setMenuItemList] = useState<MenuItemWithOption[]>([]);

  // 카테고리 선택시 화면에 보여지는 메뉴를 바꾼다.
  useEffect(() => {
    if (menuData && menuData.length > 0) {
      const list = menuData.find(m => m.id === selectedCategory);
      if (list) setMenuItemList(list.menu_item);
    }
  }, [selectedCategory, menuData]);

  // 현재 선택된 카테고리를 첫번째 값으로 초기화 한다.
  useEffect(() => {
    if (menuData && menuData.length > 0) {
      setSelectedCategory(menuData[0].id);
    }
  }, []);

  return (
    <div className={styles.container}>
      <StoreInfo orderType={orderType} storeName={storeName} />
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
