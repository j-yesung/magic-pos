import useSetCategories from '@/hooks/menu/menu-category/useSetCategories';
import useCategoriesStore from '@/shared/store/menu-category';
import useSideFormState from '@/shared/store/side-form';
import { Tables } from '@/types/supabase';
import { useRef } from 'react';
import styles from './styles/category.module.css';

const CategoryComponentPage = () => {
  const { setIsSideFormOpen } = useSideFormState();
  const { setIsEdit, category, setCategory, categories } = useCategoriesStore();
  const { updatePositionMutate } = useSetCategories();

  // 카테고리 플러스
  const clickAddCategoryHandler = async () => {
    setIsEdit(false);
    setIsSideFormOpen(true);
    setCategory({ ...category, id: '', name: '' });
  };

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: Tables<'menu_category'>) => {
    setIsEdit(true);
    setIsSideFormOpen(true);
    setCategory({ id: item.id, name: item.name, store_id: item.store_id, position: item.position });
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
    const newList = [...categories];
    const dragItemValue = newList[dragItemRef.current];
    const dragOverValue = newList[dragOverRef.current];
    const dragGroup = {
      pick: dragItemValue,
      over: dragOverValue,
    };
    updatePositionMutate(dragGroup);
    dragItemRef.current = 0;
    dragOverRef.current = 0;
  };

  return (
    <div className={styles['wrap']}>
      <ul>
        {categories.map((category, idx) => {
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => clickChoiceCategoryHandler(category)}
                draggable
                onDragStart={e => dragStartHandler(e, idx)}
                onDragEnter={e => dragEnterHandler(e, idx)}
                onDragEnd={dropHandler}
                onDragOver={e => e.preventDefault()}
              >
                {category.name}
              </button>
            </li>
          );
        })}
        <li>
          <button type="button" onClick={clickAddCategoryHandler}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CategoryComponentPage;
