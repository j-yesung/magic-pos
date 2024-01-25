import useSetCategories from '@/hooks/menu/menu-category/useSetCategories';
import { useModal } from '@/hooks/service/ui/useModal';
import useCategoriesStore, { setCategory, setIsEdit } from '@/shared/store/menu/menu-category';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import MenuCategoryModal from './modal/MenuCategoryModal';
import styles from './styles/category.module.css';
import CloseButton from '/public/icons/close.svg';
import EditButton from '/public/icons/pencil.svg';

interface PropsType {
  item: Tables<'menu_category'>;
  idx: number;
  dropNum: number;
  setDropNum: React.Dispatch<React.SetStateAction<number>>;
}

const CategroyCardPage = ({ item, idx, dropNum, setDropNum }: PropsType) => {
  const { MagicModal } = useModal();
  const { updatePositionMutate, deleteMutate } = useSetCategories();
  const category = useCategoriesStore(state => state.category);
  const categories = useCategoriesStore(state => state.categories);
  const [isDragging, setIsDragging] = useState(false);

  // 카테고리 수정
  const clickChoiceCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.fire(<MenuCategoryModal />);
    setIsEdit(true);
    setCategory({ id: item.id, name: item.name, store_id: item.store_id, position: item.position });
  };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.confirm({
      icon: <FiAlertCircle size={50} />,
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
    setDropNum(index);
  };

  // 드래그 중인 요소 위로 이동할 때 스타일 변경
  const handleDragOver = () => {
    setIsDragging(true);
  };

  // 드래그 중인 요소가 영역을 떠날 때 스타일 초기화
  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // 드랍 (커서 뗐을 때)
  const dropHandler = async () => {
    setIsDragging(false);
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
          <span className={styles['edit-btn']} onClick={() => clickChoiceCategoryHandler(item)}>
            <EditButton width={16} height={16} />
          </span>
          <span className={styles['remove-btn']} onClick={() => clickRemoveCategoryHandler(item)}>
            <CloseButton width={15} height={15} />
          </span>
        </span>
      </button>
    </li>
  );
};

export default CategroyCardPage;
