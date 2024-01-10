import useMenuItemStore from '@/shared/store/menu-item';
import styles from './styles/menu-item-category.module.css';

const MenuItemCategoryPage = () => {
  const { categoryWithMenuItem, setCategoryWithMenuItem, categoryWithMenuItemList } = useMenuItemStore();

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryWithItemType) => {
    setCategoryWithMenuItem({
      ...categoryWithMenuItem,
      id: item.id,
      menu_item: item.menu_item,
    });
    console.log(categoryWithMenuItem);
  };
  return (
    <div className={styles['wrap']}>
      <ul>
        {categoryWithMenuItemList.map(item => {
          return (
            <li key={item.id} className={item.id === categoryWithMenuItem.id ? styles['active'] : ''}>
              <button type="button" onClick={() => clickChoiceCategoryHandler(item)}>
                {item.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MenuItemCategoryPage;
