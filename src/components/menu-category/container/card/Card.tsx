import styles from '@/components/menu-category/styles/category.module.css';
import { MENU_DRAG } from '@/data/menu-item';
import useDragDrop from '@/hooks/service/menu/useDragDrop';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { useEffect } from 'react';
import EditCategoryComponent from '../form/EditCategory';
import RemoveCategoryComponent from '../form/RemoveCategory';

interface PropsType {
  item: Tables<'menu_category'>;
  idx: number;
  dropNum: number;
  setDropNum: React.Dispatch<React.SetStateAction<number>>;
}

const CategroyCardPage = ({ item, idx, dropNum, setDropNum }: PropsType) => {
  const {
    isDragging,
    setIsDragging,
    dragEnterHandler,
    dragStartHandler,
    dropHandler,
    handleDragLeave,
    handleDragOver,
  } = useDragDrop();

  useEffect(() => {
    setIsDragging(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  return (
    <li key={item.id}>
      <button
        type="button"
        draggable
        onDragStart={e => dragStartHandler(e, idx)}
        onDragEnter={e => dragEnterHandler(e, idx, setDropNum)}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDragEnd={() => dropHandler(dropNum, MENU_DRAG.CATEGORY)}
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
