import useMenuItemStore from '@/shared/store/menu-item';
import useSideFormState from '@/shared/store/side-form';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useState } from 'react';
import MenuItemCard from '../items/MenuItemCard';
import styles from '../styles/menu-item.module.css';

const MenuItemPage = () => {
  const { setIsSideFormOpen } = useSideFormState();

  const {
    setIsEdit,
    sampleImage,
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    categoryWithMenuItemList,
    setMenuItemImgFile,
    setMenuItemSampleImg,
    setMenuOptions,
  } = useMenuItemStore();

  const [dropNum, setDropNum] = useState(0);

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    setIsEdit(false);
    setIsSideFormOpen(true);
    const newMenuItem: Tables<'menu_item'> = {
      id: '',
      name: '',
      category_id: categoryWithMenuItem.id,
      image_url: sampleImage,
      price: 0,
      remain_ea: 0,
      recommended: false,
      position:
        categoryWithMenuItem.menu_item.length === 0
          ? 0
          : categoryWithMenuItem.menu_item[categoryWithMenuItem.menu_item.length - 1].position + 1,
    };
    setMenuItem(newMenuItem);
    setMenuItemSampleImg(sampleImage);
    setMenuOptions([]);
    setMenuItemImgFile(null);
  };
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
          <button className={styles['plus']} type="button" onClick={clickAddMenuItemHandler}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuItemPage;
