import { updateMenuItemPosition } from '@/server/api/supabase/menu-item';
import { convertNumberToWon } from '@/shared/helper';
import useMenuItemStore from '@/shared/store/menu-item';
import useSideFormState from '@/shared/store/side-form';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import Image from 'next/image';
import React, { useRef } from 'react';
import styles from './styles/menu-item-card.module.css';

interface PropsType {
  item: Tables<'menu_item'>;
  idx: number;
  dropNum: number;
  setDropNum: React.Dispatch<React.SetStateAction<number>>;
}

const MenuItemCard = ({ item, idx, dropNum, setDropNum }: PropsType) => {
  const { setIsSideFormOpen } = useSideFormState();
  const {
    menuItem,
    setMenuItem,
    categoryWithMenuItem,
    categoryWithMenuItemList,
    setMenuItemSampleImg,
    dragMenuItemStore,
    menuOption,
    setMenuOption,
    setMenuOptions,
    origineMenuOptions,
  } = useMenuItemStore();

  // 메뉴 선택
  const clickChoiceCategoryHandler = (item: Tables<'menu_item'>) => {
    setIsSideFormOpen(true);
    setMenuItem(item);
    setMenuItemSampleImg(item.image_url ?? '');
    fetchMenuOptionData(item.id);
    setMenuOption({ ...menuOption, menu_id: item.id });
  };

  // 메뉴 옵션 ID 필터링 이벤트
  const fetchMenuOptionData = (menuId: string) => {
    const filterMenuOptionList = origineMenuOptions.filter(item => item.menu_id === menuId);
    // setMenuOptionList(filterMenuOptionList);
    setMenuOptions(filterMenuOptionList);
  };

  // 드래그 이벤트
  const dragItemRef = useRef(0); // 드래그할 아이템의 인덱스
  const dragOverRef = useRef(0); // 드랍할 위치의 아이템의 인덱스

  // 드래그 시작될 때 실행
  const dragStartHandler = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItemRef.current = index;
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnterHandler = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragOverRef.current = index;
    setDropNum(index);
  };
  // 드랍 (커서 뗐을 때)
  const dropHandler = async () => {
    const filterIndex: number = categoryWithMenuItemList.findIndex(list => list.id === categoryWithMenuItem.id);
    const newList = [...categoryWithMenuItemList[filterIndex].menu_item];
    const dragItemValue = newList[dragItemRef.current];
    const dragOverValue = newList[dropNum];
    dragMenuItemStore(dragItemValue, dragOverValue);
    await updateMenuItemPosition(dragItemValue.id, dragOverValue.position);
    await updateMenuItemPosition(dragOverValue.id, dragItemValue.position);
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
      <button
        type="button"
        onClick={() => clickChoiceCategoryHandler(item)}
        draggable
        onDragStart={e => dragStartHandler(e, idx)}
        onDragEnter={e => dragEnterHandler(e, idx)}
        onDragEnd={dropHandler}
      >
        <span className={styles['img']}>
          <Image src={item.image_url ?? ''} alt={item.name ?? ''} width={100} height={100} />
        </span>
        <span className={styles['txt']}>
          <span className={styles['name']}>{item.name}</span>
          <span className={styles['price']}>{convertNumberToWon(item.price)}</span>
          <span className={styles['remain-ea']}>남은 갯수: {item.remain_ea}</span>
          <span className={styles['position']}>위치: {item.position}</span>
          <span className={styles['option']}>
            {origineMenuOptions
              .filter(options => options.menu_id === item.id)
              .map((option: Tables<'menu_option'>) => (
                <span key={option.id}>{option.name}</span>
              ))}
          </span>
        </span>
      </button>
    </li>
  );
};

export default MenuItemCard;
