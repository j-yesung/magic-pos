import { addMenuItem, updateMenuItemPosition } from '@/server/api/supabase/menu-item';
import useMenuItemStore from '@/shared/store/menu-item';
import clsx from 'clsx';
import Image from 'next/image';
import { useRef } from 'react';
import styles from './styles/menu-item.module.css';

const MenuItemPage = () => {
  const {
    sampleImage,
    toggleShow,
    menuItem,
    setMenuItem,
    menuItemList,
    setMenuItemList,
    categoryWithMenuItem,
    categoryWithMenuItemList,
    setCategoryWithMenuItemList,
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
    const newMenuItem: MenuItemType = {
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
    setMenuItemSampleImg(newMenuItem.image_url!);
  };

  // 메뉴 선택
  const clickChoiceCategoryHandler = (item: MenuItemType) => {
    toggleShow(true);
    setMenuItem(item);
    setMenuItemSampleImg(item.image_url!);
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
    <div className={styles['wrap']}>
      <ul>
        {categoryWithMenuItemList
          .filter(list => list.id === categoryWithMenuItem.id)
          .map(categoryWithMenu =>
            categoryWithMenu.menu_item.map((item, idx) => (
              <li
                key={item.id}
                className={clsx({
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
                  <span>
                    <Image src={item.image_url!} alt={item.name!} width={50} height={50} />
                  </span>
                  <span>name: {item.name}</span>
                  <span>price: {item.price}</span>
                  <span>remain_ea: {item.remain_ea}</span>
                  <span>position: {item.position}</span>
                </button>
              </li>
            )),
          )}
        <li>
          <button type="button" onClick={clickAddMenuItemHandler}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuItemPage;
