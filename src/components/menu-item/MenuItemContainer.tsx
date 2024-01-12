import useMenuItemStore from '@/shared/store/menu-item';
import { useEffect } from 'react';
import MenuItemFormPage from './MenuItemForm';
import MenuItemListPage from './MenuItemList';
import styles from './styles/menu-item-container.module.css';

interface PropsType {
  categoryWithMenuData: CategoryWithItemType[];
  storeId: string;
}

const MenuItemsComponentPage = (props: PropsType) => {
  const { categoryWithMenuData, storeId } = props;

  const { setMenuItemList, categoryWithMenuItem, setCategoryWithMenuItem, setCategoryWithMenuItemList } =
    useMenuItemStore();

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryWithMenuData]);

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
