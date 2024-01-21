import useSetCategories from '@/hooks/menu/menu-category/useSetCategories';
import { useModal } from '@/hooks/modal/useModal';
import useCategoriesStore from '@/shared/store/menu-category';
import { Tables } from '@/types/supabase';
import { useRef } from 'react';
import MenuCategoryModal from './menu-category-modal/MenuCategoryModal';
import styles from './styles/category.module.css';
import CloseButton from '/public/icons/close.svg';
import EditButton from '/public/icons/pencil.svg';
import PlusButton from '/public/icons/plus.svg';

const CategoryComponentPage = () => {
  const { MagicModal } = useModal();
  const { setIsEdit, category, setCategory, categories } = useCategoriesStore();
  const { updatePositionMutate } = useSetCategories();
  const { deleteMutate } = useSetCategories();

  // 카테고리 플러스
  const clickAddCategoryHandler = async () => {
    MagicModal.fire(<MenuCategoryModal />);
    console.log('플러스 여기');
    setIsEdit(false);
    setCategory({ ...category, id: '', name: '' });
  };

  // 카테고리 수정
  const clickChoiceCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.fire(<MenuCategoryModal />);
    setIsEdit(true);
    setCategory({ id: item.id, name: item.name, store_id: item.store_id, position: item.position });
  };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.confirm({
      content: '정말로 삭제하시겠습니까?',
      confirmButtonCallback: () => {
        deleteMutate(item.id);
        setCategory({ ...category, id: '', name: '' });
      },
    });
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
                draggable
                onDragStart={e => dragStartHandler(e, idx)}
                onDragEnter={e => dragEnterHandler(e, idx)}
                onDragEnd={dropHandler}
                onDragOver={e => e.preventDefault()}
              >
                {category.name}
                <span className={styles['btn-wrap']}>
                  <span className={styles['edit-btn']} onClick={() => clickChoiceCategoryHandler(category)}>
                    <EditButton width={16} height={16} />
                  </span>
                  <span className={styles['remove-btn']} onClick={() => clickRemoveCategoryHandler(category)}>
                    <CloseButton width={15} height={15} />
                  </span>
                </span>
              </button>
            </li>
          );
        })}
        <li>
          <button className={styles['plus-btn']} type="button" onClick={() => clickAddCategoryHandler()}>
            <PlusButton width={22} height={22} />
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CategoryComponentPage;
