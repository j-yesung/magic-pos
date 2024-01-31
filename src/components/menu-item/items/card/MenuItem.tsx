import MenuItemCard from '@/components/menu-item/items/card/Card';
import PlusItemComponent from '@/components/menu-item/items/form/PlusItem';
import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import clsx from 'clsx';
import { useState } from 'react';

const MenuItemPage = () => {
  const menuItem = useMenuItemStore(state => state.menuItem);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);

  const [dropNum, setDropNum] = useState(0);

  return (
    <div className={clsx(styles.wrap, { [styles.active]: menuItem.id !== '' })}>
      <ul>
        {categoryWithMenuItemList
          .filter(list => list.id === categoryWithMenuItem.id)
          .map(categoryWithMenu =>
            categoryWithMenu.menu_item.map((item, idx) => (
              <MenuItemCard dropNum={dropNum} setDropNum={setDropNum} key={item.id} item={item} idx={idx} />
            )),
          )}
        <li>
          <PlusItemComponent />
        </li>
      </ul>
    </div>
  );
};

export default MenuItemPage;
