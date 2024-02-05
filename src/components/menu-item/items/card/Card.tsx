import MenuItemModal from '@/components/menu-item/items/modal/MenuItemModal';
import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import { MENU_DRAG } from '@/data/menu-item';
import useDragDrop from '@/hooks/service/menu/useDragDrop';
import useOptionFiltering from '@/hooks/service/menu/useOptionFiltering';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore, {
  setIsEdit,
  setMenuItem,
  setMenuItemImgFile,
  setMenuItemSampleImg,
} from '@/shared/store/menu/menu-item';
import useMenuOptionStore, { setMenuOption } from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import MenuItemCardImg from './CardImg';
import MenuItemCardTxt from './CardTxt';
import EditButton from '/public/icons/pencil.svg';

interface PropsType {
  item: Tables<'menu_item'>;
  idx: number;
  dropNum: number;
  setDropNum: React.Dispatch<React.SetStateAction<number>>;
}

const MenuItemCard = ({ item, idx, dropNum, setDropNum }: PropsType) => {
  const { MagicModal } = useModal();
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuOption = useMenuOptionStore(state => state.menuOption);
  const { fetchMenuOptionData } = useOptionFiltering();
  const {
    isDragging,
    setIsDragging,
    dragEnterHandler,
    dragStartHandler,
    dropHandler,
    handleDragLeave,
    handleDragOver,
  } = useDragDrop();

  // 메뉴 선택
  const clickChoiceCategoryHandler = (item: Tables<'menu_item'>) => {
    setIsEdit(true);
    MagicModal.fire(<MenuItemModal />);
    setMenuItem(item);
    setMenuItemSampleImg(item.image_url ?? '');
    fetchMenuOptionData(item.id);
    setMenuOption({ ...menuOption, menu_id: item.id });
    setMenuItemImgFile(null);
  };

  useEffect(() => {
    setIsDragging(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <li
      key={item.id}
      className={clsx(styles.li, {
        [styles.active]: item.id === menuItem.id,
        [styles.recommended]: item.recommended,
      })}
      onClick={() => clickChoiceCategoryHandler(item)}
    >
      <FaStar className={styles['recommended-icon']} size={20} />
      <button
        type="button"
        draggable
        onDragStart={e => dragStartHandler(e, idx)}
        onDragEnter={e => dragEnterHandler(e, idx, setDropNum)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={() => dropHandler(dropNum, MENU_DRAG.ITEM)}
        className={clsx(styles.draggable, {
          [styles.dragging]: isDragging,
        })}
      >
        <MenuItemCardImg item={item} />
        <MenuItemCardTxt item={item} />
      </button>
      <span className={styles['btn-wrap']}>
        <span className={styles['edit-btn']}>
          <EditButton width={27} height={27} />
        </span>
      </span>
    </li>
  );
};

export default MenuItemCard;
