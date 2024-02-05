import MenuItemModal from '@/components/menu-item/items/modal/MenuItemModal';
import styles from '@/components/menu-item/styles/menu-item-card.module.css';
import { MENU_DRAG } from '@/data/menu-item';
import useDragDrop from '@/hooks/service/menu/useDragDrop';
import useOptionFiltering from '@/hooks/service/menu/useOptionFiltering';
import { useModal } from '@/hooks/service/ui/useModal';
import { convertNumberToWon } from '@/shared/helper';
import useMenuItemStore, {
  setIsEdit,
  setMenuItem,
  setMenuItemImgFile,
  setMenuItemSampleImg,
} from '@/shared/store/menu/menu-item';
import useMenuOptionStore, { setMenuOption } from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import EditButton from '/public/icons/pencil.svg';
import Default from '/public/whiteLogo.svg';

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
  const origineMenuOptions = useMenuOptionStore(state => state.origineMenuOptions);
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
        onClick={() => clickChoiceCategoryHandler(item)}
        className={clsx(styles.draggable, {
          [styles.dragging]: isDragging,
        })}
      >
        <span className={styles['img']}>
          {item.image_url ? (
            <Image src={item.image_url} alt={item.name ?? 'Sample Image'} width={100} height={100} />
          ) : (
            <Default width={80} height={30} />
          )}
        </span>
        <span className={styles['txt']}>
          <span className={styles['name']}>{item.name}</span>
          <span className={styles['price-wrap']}>
            <span className={styles['price']}>{convertNumberToWon(item.price)}</span>
            <span className={styles['remain-ea']}>수량 {item.remain_ea}</span>
          </span>
          <span className={styles['option']}>
            {origineMenuOptions
              .filter(options => options.menu_id === item.id)
              .map((option: Tables<'menu_option'>) => (
                <span key={option.id}>
                  <span>{option.name}</span>
                </span>
              ))}
          </span>
        </span>
      </button>
      <span className={styles['btn-wrap']} onClick={() => clickChoiceCategoryHandler(item)}>
        <span className={styles['edit-btn']}>
          <EditButton width={27} height={27} />
        </span>
      </span>
    </li>
  );
};

export default MenuItemCard;
