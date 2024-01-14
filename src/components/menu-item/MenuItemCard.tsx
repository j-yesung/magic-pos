import { updateMenuItemPosition } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef } from 'react';
import styles from './styles/menu-item-card.module.css';

interface PropsType {
  item: Tables<'menu_item'>;
  idx: number;
}

const MenuItemCard = ({ item, idx }: PropsType) => {
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

  // 메뉴 선택
  const clickChoiceCategoryHandler = (item: Tables<'menu_item'>) => {
    toggleShow(true);
    setMenuItem(item);
    setMenuItemSampleImg(item.image_url ?? '');
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
  };

  // 드랍 (커서 뗐을 때)
  const dropHandler = async () => {
    const filterIndex: number = categoryWithMenuItemList.findIndex(list => list.id === categoryWithMenuItem.id);

    const newList = [...categoryWithMenuItemList[filterIndex].menu_item];
    const dragItemValue = newList[dragItemRef.current];
    const dragOverValue = newList[dragOverRef.current];
    dragMenuItemStore(dragItemValue, dragOverValue);
    await updateMenuItemPosition(dragItemValue.id, dragOverValue.position);
    await updateMenuItemPosition(dragOverValue.id, dragItemValue.position);
    dragItemRef.current = 0;
    dragOverRef.current = 0;
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
        onDragOver={e => e.preventDefault()}
      >
        <span className={styles['img']}>
          <Image src={item.image_url ?? ''} alt={item.name ?? ''} width={50} height={50} />
        </span>
        <span className={styles['txt']}>
          <span className={styles['name']}>
            <span>메뉴명: </span>
            <strong>{item.name}</strong>
          </span>
          <span className={styles['price']}>
            <span>가격: </span>
            <strong>{item.price}원</strong>
          </span>
          <span className={styles['remain-ea']}>
            <span>남은 갯수: </span>
            <strong>{item.remain_ea}</strong>
          </span>
        </span>
      </button>
    </li>
  );
};

export default MenuItemCard;
