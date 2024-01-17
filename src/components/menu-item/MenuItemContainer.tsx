import { fetchMenuOptions } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import { CategoryWithMenuItem, MenuOptionWithDetail } from '@/types/supabase';
import { useEffect } from 'react';
import MenuItemFormPage from './MenuItemForm';
import MenuItemListPage from './MenuItemList';
import styles from './styles/menu-item-container.module.css';

interface PropsType {
  categoryWithMenuData: CategoryWithMenuItem[];
  storeId: string;
  menuOptionData: MenuOptionWithDetail[];
}

const MenuItemsComponentPage = (props: PropsType) => {
  const { categoryWithMenuData, storeId, menuOptionData } = props;

  const {
    setMenuItemList,
    categoryWithMenuItem,
    setCategoryWithMenuItem,
    setCategoryWithMenuItemList,
    setMenuOptions,
    setOrigineMenuOptions,
    changeMenuOptions,
  } = useMenuItemStore();

  useEffect(() => {
    setCategoryWithMenuItemList(categoryWithMenuData);
    setCategoryWithMenuItem({
      ...categoryWithMenuItem,
      id: categoryWithMenuData[0].id, // 초기값 첫 카테고리 선택
      store_id: storeId,
      position: categoryWithMenuData.length,
      menu_item: categoryWithMenuData[0].menu_item, // 초기값 첫 카테고리 선택
    });
    setMenuItemList(categoryWithMenuData[0].menu_item);
    setMenuOptions(menuOptionData);
    setOrigineMenuOptions(menuOptionData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryWithMenuData, menuOptionData]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeMenuOptions]);

  const fetchData = async () => {
    const { data } = await fetchMenuOptions();
    setMenuOptions(data);
    setOrigineMenuOptions(data);
    return data;
  };

  return (
    <div className={styles['wrap']}>
      <div className={styles['menu-container']}>
        <MenuItemListPage />
        <MenuItemFormPage />
      </div>
    </div>
  );
};

export default MenuItemsComponentPage;
