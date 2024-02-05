import { MENU_DRAG } from '@/data/menu-item';
import useSetCategories from '@/hooks/query/menu/menu-category/useSetCategories';
import useSetMenuItem from '@/hooks/query/menu/menu-item/useSetMenuItems';
import useCategoriesStore from '@/shared/store/menu/menu-category';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import { useRef, useState } from 'react';

const useDragDrop = () => {
  const { updatePositionMutate: updateCategoryPositionMutate } = useSetCategories();
  const { updatePositionMutate: updateMenuItemPositionMutate } = useSetMenuItem();
  const categories = useCategoriesStore(state => state.categories);
  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);

  const [isDragging, setIsDragging] = useState(false);
  const dragItemRef = useRef(0); // 드래그할 아이템의 인덱스
  const dragOverRef = useRef(0); // 드랍할 위치의 아이템의 인덱스

  // 드래그 시작될 때 실행
  const dragStartHandler = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItemRef.current = index;
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnterHandler = (
    e: React.DragEvent<HTMLButtonElement>,
    index: number,
    setDropNum: React.Dispatch<React.SetStateAction<number>>,
  ) => {
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
  const dropHandler = async (dropNum: number, dragTitle: string) => {
    let newList = [];
    if (dragTitle === MENU_DRAG.CATEGORY) {
      // 카테고리일 때
      newList = [...categories];
      const dragItemValue = newList[dragItemRef.current];
      const dragOverValue = newList[dropNum];
      const dragGroup = {
        pick: dragItemValue,
        over: dragOverValue,
      };
      updateCategoryPositionMutate(dragGroup);
      dragItemRef.current = dropNum;
      dragOverRef.current = dragItemRef.current;
    } else {
      // 메뉴 아이템일 때
      const filterIndex: number = categoryWithMenuItemList.findIndex(list => list.id === categoryWithMenuItem.id);
      newList = [...categoryWithMenuItemList[filterIndex].menu_item];
      const dragItemValue = newList[dragItemRef.current];
      const dragOverValue = newList[dropNum];
      const dragGroup = {
        pick: dragItemValue,
        over: dragOverValue,
      };
      updateMenuItemPositionMutate(dragGroup);
      dragItemRef.current = dropNum;
      dragOverRef.current = dragItemRef.current;
    }
  };

  return {
    isDragging,
    setIsDragging,
    dragStartHandler,
    dragEnterHandler,
    handleDragOver,
    handleDragLeave,
    dropHandler,
  };
};

export default useDragDrop;
