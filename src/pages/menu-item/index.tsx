import MenuItemsComponentPage from '@/components/menu-item/MenuItemContainer';
import { fetchCategoriesWithMenuItemBystore_id } from '@/server/api/menu-category';
import useCategoriesStore from '@/shared/store/menu-category';
import useMenuItemStore from '@/shared/store/menu-item';
import { useEffect } from 'react';

interface PropsType {
  categoryWithMenuData: CategoryWithItemType[];
  storeId: string;
}

const CategoryPage = (props: PropsType) => {
  const { categoryWithMenuData, storeId } = props;

  const { category, setCategory, categories, setCategories } = useCategoriesStore();
  const {
    menuItemList,
    setMenuItemList,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    setCategoryWithMenuItem,
    categoryWithMenuItemList,
    setCategoryWithMenuItemList,
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
    console.log(categoryWithMenuItemList);
    // console.log(category);
  }, [categoryWithMenuData]);

  return <MenuItemsComponentPage />;
};

export default CategoryPage;

export async function getStaticProps() {
  const storeId = '0c4b3064-7983-42a7-9e92-207373b019ad';
  const { data: categoryWithMenuData } = await fetchCategoriesWithMenuItemBystore_id(storeId);

  return {
    props: {
      categoryWithMenuData,
      storeId,
    },
  };
}
