import MenuItemPage from './MenuItem';
import MenuItemCategoryPage from './MenuItemCategory';

const MenuItemListPage = () => {
  return (
    <>
      <h2>메뉴 관리</h2>
      <MenuItemCategoryPage />
      <MenuItemPage />
    </>
  );
};

export default MenuItemListPage;
