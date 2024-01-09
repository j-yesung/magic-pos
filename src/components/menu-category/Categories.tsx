import { addCategory, removeCategory, updateCategoryName, updateCategoryPosition } from '@/pages/api/menu-category';
import useCategoriesStore from '@/shared/store/menu-category';
import { useEffect, useRef } from 'react';
import styles from './styles/categories.module.css';

const CategoriesComponentPage = (props: { data: CategoryType[] }) => {
  const { data } = props;

  // const [categories, setCategories] = useState<CategoryType[]>(data);
  // const [category, setCategory] = useState<CategoryType>({
  //   id: '',
  //   name: '',
  //   store_id: '0c4b3064-7983-42a7-9e92-207373b019ad',
  //   position: data.length,
  // });

  const {
    category,
    setCategory,
    categories,
    setCategories,
    // fetchCategories,
    addCategoryStore,
    removeCategoryStore,
    updateCategoryStore,
    dragCategoryStore,
  } = useCategoriesStore();

  useEffect(() => {
    setCategories(data);
    setCategory({
      ...category,
      store_id: '0c4b3064-7983-42a7-9e92-207373b019ad',
      position: data.length,
    });
    console.log(categories);
  }, [data]);

  // 카테고리 input handler
  const changeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    setCategory({ ...category, [name]: value.slice(0, maxLength) });
  };

  // 카테고리 플러스
  const clickAddCategoryHandler = async () => {
    console.log(category);
    const emptyValue = `카테고리를 수정해주세요 ${categories.length}`;
    const { data } = await addCategory(category.store_id, emptyValue, categories.length);
    console.log(data);
    // console.log(data[0]);
    setCategory({
      id: data[0].id,
      name: data[0].name || '',
      store_id: data[0].store_id,
      position: data[0].position || 0,
    });

    addCategoryStore(category);
    console.log(categories);
  };

  // 카테고리 수정
  const submitupdateCategoryNameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const copiedItems = updateCategoryNameItem();
    // setCategories(copiedItems);
    updateCategoryStore(category);
    await updateCategoryName(category.id, category.name);
    setCategory({ ...category, name: '' });
  };

  // 카테고리 이름 수정 아이템
  // const updateCategoryNameItem = () => {
  //   const findIndex = categories.findIndex(item => item.id === category.id);
  //   const copiedItems = [...categories];
  //   copiedItems[findIndex].name = category.name;
  //   return copiedItems;
  // };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = async () => {
    console.log(category);
    removeCategoryStore(category);
    setCategory({ ...category, id: '', name: '' });
    await removeCategory(category.id);
  };

  // 카테고리 선택
  const clickChoiceCategoryHandler = (item: CategoryType) => {
    setCategory({
      id: item.id,
      name: item.name,
      store_id: item.store_id,
      position: item.position,
    });
    console.log(item);
    console.log(category);
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
    // setCategories(
    //   categories.map(category =>
    //     category.id === dragItemValue.id
    //       ? {
    //           id: dragOverValue.id,
    //           name: dragOverValue.name,
    //           store_id: dragOverValue.store_id,
    //           position: dragItemValue.position,
    //         }
    //       : category.id === dragOverValue.id
    //       ? {
    //           id: dragItemValue.id,
    //           name: dragItemValue.name,
    //           store_id: dragItemValue.store_id,
    //           position: dragOverValue.position,
    //         }
    //       : category,
    //   ),
    // );
    dragCategoryStore(dragItemValue, dragOverValue);
    await updateCategoryPosition(dragItemValue.id, dragOverValue.position);
    await updateCategoryPosition(dragOverValue.id, dragItemValue.position);
    dragItem.current = 0;
    dragOverItem.current = 0;
  };

  return (
    <>
      <h2 className="bg-[gold]">카테고리 등록하기</h2>
      <div>
        {/* <CategoryComponentPage categories={categories} /> */}
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
        {/* <CategoryFormPage /> */}
        <form onSubmit={submitupdateCategoryNameHandler}>
          <input
            type="text"
            onChange={changeCategoryHandler}
            name="name"
            value={category.name}
            minLength={2}
            maxLength={10}
            className="border-[#ccc] border-[1px] rounded-[10px]"
          />

          <button type="submit">수정</button>
          <button type="button" onClick={clickRemoveCategoryHandler}>
            삭제
          </button>
        </form>
      </div>
    </>
  );
};

export default CategoriesComponentPage;
