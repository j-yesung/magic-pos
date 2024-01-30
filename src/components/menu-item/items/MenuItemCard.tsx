import useSetMenuItem from '@/hooks/menu/menu-item/useSetMenuItems';
import { useModal } from '@/hooks/service/ui/useModal';
import { convertNumberToWon } from '@/shared/helper';
import useMenuItemStore, {
  setIsEdit,
  setMenuItem,
  setMenuItemImgFile,
  setMenuItemSampleImg,
} from '@/shared/store/menu/menu-item';
import useMenuOptionStore from '@/shared/store/menu/menu-option';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import styles from '../styles/menu-item-card.module.css';
import MenuItemModal from './MenuItemModal';
import EditButton from '/public/icons/pencil.svg';

interface PropsType {
  item: Tables<'menu_item'>;
  idx: number;
  dropNum: number;
  setDropNum: React.Dispatch<React.SetStateAction<number>>;
}

const MenuItemCard = ({ item, idx, dropNum, setDropNum }: PropsType) => {
  const { MagicModal } = useModal();
  const { updatePositionMutate } = useSetMenuItem();
  const sampleImage = useMenuItemStore(state => state.sampleImage);
  const menuItem = useMenuItemStore(state => state.menuItem);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const { menuOption, setMenuOption, setMenuOptions, origineMenuOptions } = useMenuOptionStore();

  const [isDragging, setIsDragging] = useState(false);

  // 메뉴 선택
  const clickChoiceCategoryHandler = (item: Tables<'menu_item'>) => {
    setIsEdit(true);
    MagicModal.fire(<MenuItemModal />);
    setMenuItem({
      ...menuItem,
      id: item.id,
      name: item.name,
      category_id: item.category_id,
      image_url: item.image_url,
      position: item.position,
      price: item.price,
      recommended: item.recommended,
      remain_ea: item.remain_ea,
    });
    setMenuItemSampleImg(item.image_url ?? '');
    fetchMenuOptionData(item.id);
    setMenuOption({ ...menuOption, menu_id: item.id });
    setMenuItemImgFile(null);
  };

  // 메뉴 옵션 ID 필터링 이벤트
  const fetchMenuOptionData = (menuId: string) => {
    const filterMenuOptionList = origineMenuOptions.filter(item => item.menu_id === menuId);
    setMenuOptions(filterMenuOptionList);
  };

  // 드래그 이벤트
  const dragItemRef = useRef(0); // 드래그할 아이템의 인덱스
  const dragOverRef = useRef(0); // 드랍할 위치의 아이템의 인덱스

  useEffect(() => {
    setIsDragging(false);
  }, [idx]);

  // 드래그 시작될 때 실행
  const dragStartHandler = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItemRef.current = index;
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnterHandler = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragOverRef.current = index;
    setDropNum(index);
    setIsDragging(true);
  };

  // 드래그 중인 요소 위로 이동할 때 스타일 변경
  const handleDragOver = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // 드래그 중인 요소가 영역을 떠날 때 스타일 초기화
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // 드랍 (커서 뗐을 때)
  const dropHandler = async () => {
    const filterIndex: number = categoryWithMenuItemList.findIndex(list => list.id === categoryWithMenuItem.id);
    const newList = [...categoryWithMenuItemList[filterIndex].menu_item];
    const dragItemValue = newList[dragItemRef.current];
    const dragOverValue = newList[dropNum];
    const dragGroup = {
      pick: dragItemValue,
      over: dragOverValue,
    };
    updatePositionMutate(dragGroup);
    dragItemRef.current = dropNum;
    dragOverRef.current = dragItemRef.current;
  };

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
        onDragEnter={e => dragEnterHandler(e, idx)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={dropHandler}
        onClick={() => clickChoiceCategoryHandler(item)}
        className={clsx(styles.draggable, {
          [styles.dragging]: isDragging,
        })}
      >
        <span className={styles['img']}>
          <Image src={item.image_url ?? sampleImage} alt={item.name ?? 'Sample Image'} width={100} height={100} />
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
