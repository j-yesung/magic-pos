import { addCategory, updateCategoryPosition } from '@/pages/api/menu-category';
import useCategoriesStore from '@/shared/store/menu-category';
import { useRef } from 'react';
import styles from './styles/categories.module.css';

const CategoryComponentPage = () => {
  const { category, setCategory, categories, addCategoryStore, dragCategoryStore } = useCategoriesStore();

  // 카테고리 플러스
  const clickAddCategoryHandler = async () => {
    const emptyValue = `카테고리를 수정해주세요 ${categories.length}`;
    const { data } = await addCategory(category.store_id, emptyValue, categories.length);
    setCategory({
      id: data[0].id,
      name: data[0].name || '',
      store_id: data[0].store_id,
      position: data[0].position || 0,
    });
    addCategoryStore(category);
  };

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryType) => {
    setCategory({
      id: item.id,
      name: item.name,
      store_id: item.store_id,
      position: item.position,
    });
  };

  // 드래그 이벤트
  const dragItem = useRef(0); // 드래그할 아이템의 인덱스
  const dragOverItem = useRef(0); // 드랍할 위치의 아이템의 인덱스

  // 드래그 시작될 때 실행
  const dragStart = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragItem.current = index;
  };

  // 드래그중인 대상이 위로 포개졌을 때
  const dragEnter = (e: React.DragEvent<HTMLButtonElement>, index: number) => {
    dragOverItem.current = index;
  };

  // 드랍 (커서 뗐을 때)
  const drop = async () => {
    const newList = [...categories];
    const dragItemValue = newList[dragItem.current];
    const dragOverValue = newList[dragOverItem.current];
    dragCategoryStore(dragItemValue, dragOverValue);
    await updateCategoryPosition(dragItemValue.id, dragOverValue.position);
    await updateCategoryPosition(dragOverValue.id, dragItemValue.position);
    dragItem.current = 0;
    dragOverItem.current = 0;
  };

  return (
    <>
      <button type="button" onClick={clickAddCategoryHandler}>
        +
      </button>
      <ul>
        {categories.map((category, idx) => {
          return (
            <li key={idx} className={styles['category-li']}>
              <button
                type="button"
                onClick={() => clickChoiceCategoryHandler(category)}
                draggable
                onDragStart={e => dragStart(e, idx)}
                onDragEnter={e => dragEnter(e, idx)}
                onDragEnd={drop}
                onDragOver={e => e.preventDefault()}
              >
                index: {idx}, id: {category.id}, {category.name}, position: {category.position}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default CategoryComponentPage;
