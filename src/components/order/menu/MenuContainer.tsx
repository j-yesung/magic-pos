import React, { useEffect, useState } from 'react';
import useOrderStore from '@/shared/store/order';
import MenuCategoryContainer from '@/components/order/menu/MenuCategoryContainer';
import styles from './styles/MenuContainer.module.css';

/**
 * STEP2: 메뉴 탐색 및 선택
 * @constructor
 */
const MenuContainer = () => {
  const { menuData } = useOrderStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    if (menuData && menuData.length > 0) setSelectedCategory(menuData[0].id);
    console.log(menuData);
  }, []);

  // TODO: 에러 어떻게 띄울까?
  if (!menuData) return <div>에러</div>;

  return (
    <div>
      <MenuCategoryContainer
        menuData={menuData}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <section className={styles.section}></section>
    </div>
  );
};

export default MenuContainer;
