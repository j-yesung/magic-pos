import { addMenuItem } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useState } from 'react';
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
  } = useMenuItemStore();

  const [dropNum, setDropNum] = useState(0);

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    toggleShow(true);
    const emptyValue = `임시 메뉴명`;
    const menuItemOmit: Omit<Tables<'menu_item'>, 'id'> = {
      category_id: categoryWithMenuItem.id,
      name: emptyValue,
      image_url: sampleImage,
      price: 0,
      remain_ea: 0,
      recommended: false,
      position: categoryWithMenuItem.menu_item[categoryWithMenuItem.menu_item.length - 1].position + 1,
    };
    const { data } = await addMenuItem(menuItemOmit);
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
    <div className={clsx(styles.wrap, {[styles.active]: menuItem.id !== ''})}>
      <ul>
        {categoryWithMenuItemList
          .filter(list => list.id === categoryWithMenuItem.id)
          .map(categoryWithMenu =>
            categoryWithMenu.menu_item.map((item, idx) => (
              <MenuItemCard dropNum={dropNum} setDropNum={setDropNum} key={item.id} item={item} idx={idx} />
            )),
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
