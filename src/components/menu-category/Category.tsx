import { useModal } from '@/hooks/service/ui/useModal';
import useCategoriesStore, { setCategory, setIsEdit } from '@/shared/store/menu/menu-category';
import { useState } from 'react';
import MenuCategoryModal from './modal/MenuCategoryModal';
import styles from './styles/category.module.css';

import CategroyCardPage from './CategroyCard';
import PlusButton from '/public/icons/plus.svg';

const CategoryComponentPage = () => {
  const { MagicModal } = useModal();
  const category = useCategoriesStore(state => state.category);
  const categories = useCategoriesStore(state => state.categories);
  const [dropNum, setDropNum] = useState(0);

  // 카테고리 플러스
  const clickAddCategoryHandler = async () => {
    MagicModal.fire(<MenuCategoryModal />);
    setIsEdit(false);
    setCategory({ ...category, id: '', name: '' });
  };

  return (
    <div className={styles['wrap-container']}>
      <div className={styles['wrap']}>
        <div className={styles['drag-info']}>※ 드래그 앤 드롭으로 카테고리 순서를 변경해보세요.</div>
        <ul>
          {categories.map((category, idx) => {
            return (
              <CategroyCardPage dropNum={dropNum} setDropNum={setDropNum} key={category.id} item={category} idx={idx} />
            );
          })}
          <li>
            <button className={styles['plus-btn']} type="button" onClick={() => clickAddCategoryHandler()}>
              <PlusButton width={22} height={22} />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryComponentPage;
