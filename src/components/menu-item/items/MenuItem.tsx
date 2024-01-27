import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore, {
  setIsEdit,
  setMenuItem,
  setMenuItemImgFile,
  setMenuItemSampleImg,
} from '@/shared/store/menu/menu-item';
import useMenuOptionStore from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useState } from 'react';
import MenuItemCard from '../items/MenuItemCard';
import styles from '../styles/menu-item-card.module.css';
import MenuItemModal from './MenuItemModal';
import PlusButton from '/public/icons/plus.svg';

const MenuItemPage = () => {
  const { MagicModal } = useModal();
  const sampleImage = useMenuItemStore(state => state.sampleImage);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const { setMenuOptions } = useMenuOptionStore();

  const [dropNum, setDropNum] = useState(0);

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    const filterMenuItem = categoryWithMenuItemList.filter(item => item.id === categoryWithMenuItem.id);
    const checkMenuItem = filterMenuItem[0].menu_item;
    setIsEdit(false);
    MagicModal.fire(<MenuItemModal />);
    const newMenuItem: Tables<'menu_item'> = {
      id: '',
      name: '',
      category_id: categoryWithMenuItem.id,
      image_url: sampleImage,
      price: 0,
      remain_ea: 0,
      recommended: false,
      position: checkMenuItem.length === 0 ? 0 : checkMenuItem[checkMenuItem.length - 1].position + 1,
    };
    setMenuItem(newMenuItem);
    setMenuItemSampleImg('');
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
            <PlusButton width={22} height={22} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuItemPage;
