import useFetchCategoryWithMenu from '@/hooks/menu-item/useCategoryWithMenu';
import useFetchMenuOptions from '@/hooks/menu-item/useMenuOptions';
import { fetchMenuOptions } from '@/server/api/supabase/menu-item';
import useAuthStore from '@/shared/store/auth';
import useMenuItemStore from '@/shared/store/menu-item';
import { useEffect } from 'react';
import MenuItemFormPage from './MenuItemForm';
import MenuItemListPage from './MenuItemList';
import styles from './styles/menu-item-container.module.css';

const MenuItemsComponentPage = () => {
  const { storeId } = useAuthStore();
  const { data: categoryWithMenuData } = useFetchCategoryWithMenu(storeId ?? '');
  const { data: menuOptionData } = useFetchMenuOptions();

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
    if (categoryWithMenuData?.error === null) {
      setCategoryWithMenuItemList(categoryWithMenuData?.data);
      setCategoryWithMenuItem({
        ...categoryWithMenuItem,
        id: categoryWithMenuData?.data[0].id, // 초기값 첫 카테고리 선택
        store_id: storeId ?? '',
        position: categoryWithMenuData?.data.length,
        menu_item: categoryWithMenuData?.data[0].menu_item, // 초기값 첫 카테고리 선택
      });
      setMenuItemList(categoryWithMenuData?.data[0].menu_item);
    }
    if (menuOptionData?.error === null) {
      setMenuOptions(menuOptionData?.data);
      setOrigineMenuOptions(menuOptionData?.data);
    }
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
