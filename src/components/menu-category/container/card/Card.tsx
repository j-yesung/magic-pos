import styles from '@/components/menu-category/styles/category.module.css';
import useSetCategories from '@/hooks/query/menu/menu-category/useSetCategories';
import useCategoriesStore from '@/shared/store/menu/menu-category';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import EditCategoryComponent from '../form/EditCategory';
import RemoveCategoryComponent from '../form/RemoveCategory';

interface PropsType {
  item: Tables<'menu_category'>;
  idx: number;
  dropNum: number;
  setDropNum: React.Dispatch<React.SetStateAction<number>>;
}

const CategroyCardPage = ({ item, idx, dropNum, setDropNum }: PropsType) => {
  const { updatePositionMutate } = useSetCategories();
  const categories = useCategoriesStore(state => state.categories);
  const [isDragging, setIsDragging] = useState(false);

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
    const newList = [...categories];
    const dragItemValue = newList[dragItemRef.current];
    const dragOverValue = newList[dropNum];
    const dragGroup = {
      pick: dragItemValue,
      over: dragOverValue,
    };
    updatePositionMutate(dragGroup);
    dragItemRef.current = 0;
    dragOverRef.current = 0;
  };

  return (
    <li key={item.id}>
      <button
        type="button"
        draggable
        onDragStart={e => dragStartHandler(e, idx)}
        onDragEnter={e => dragEnterHandler(e, idx)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={dropHandler}
        className={clsx(styles.draggable, {
          [styles.dragging]: isDragging,
        })}
      >
        {item.name}
        <span className={styles['btn-wrap']}>
          <EditCategoryComponent item={item} />
          <RemoveCategoryComponent item={item} />
        </span>
      </button>
    </li>
  );
};

export default CategroyCardPage;
