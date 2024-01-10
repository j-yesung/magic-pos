import MenuItemFormPage from './MenuItemForm';
import MenuItemListPage from './MenuItemList';
import styles from './styles/menu-item-container.module.css';

const MenuItemsComponentPage = () => {
  return (
    <div className={styles['wrap']}>
      <h2 className={styles['menu-h2']}>메뉴 등록하기</h2>
      <div className={styles['menu-container']}>
        <MenuItemListPage />
        <MenuItemFormPage />
      </div>
    </div>
  );
};

export default MenuItemsComponentPage;
