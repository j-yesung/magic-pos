import { addMenuItem } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import MenuItemCard from './MenuItemCard';
import styles from './styles/menu-item.module.css';

const MenuItemPage = () => {
  const {
    sampleImage,
    toggleShow,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    categoryWithMenuItemList,
    addMenuItemStore,
    setMenuItemSampleImg,
    dragMenuItemStore,
  } = useMenuItemStore();

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    toggleShow(true);
    const emptyValue = `임시 메뉴명`;
    const { data } = await addMenuItem(
      categoryWithMenuItem.id,
      emptyValue,
      sampleImage,
      0,
      0,
      false,
      categoryWithMenuItem.menu_item[categoryWithMenuItem.menu_item.length - 1].position + 1,
    );
    const newMenuItem: Tables<'menu_item'> = {
      id: data[0].id,
      image_url: data[0].image_url || '',
      category_id: data[0].category_id,
      name: data[0].name || '',
      price: data[0].price || 0,
      remain_ea: data[0].remain_ea || 0,
      recommended: false,
      position: data[0].position || 0,
    };
    setMenuItem(newMenuItem);
    addMenuItemStore(newMenuItem);
    setMenuItemSampleImg(newMenuItem.image_url ?? '');
  };

  return (
    <div className={menuItem.id !== '' ? clsx(styles['wrap'], styles['active']) : styles['wrap']}>
      <ul>
        {categoryWithMenuItemList
          .filter(list => list.id === categoryWithMenuItem.id)
          .map(categoryWithMenu =>
            categoryWithMenu.menu_item.map((item, idx) => <MenuItemCard key={item.id} item={item} idx={idx} />),
          )}
        <li>
          <button className={styles['plus']} type="button" onClick={clickAddMenuItemHandler}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuItemPage;
