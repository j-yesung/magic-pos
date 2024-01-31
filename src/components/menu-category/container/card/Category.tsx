import styles from '@/components/menu-category/styles/category.module.css';
import useCategoriesStore from '@/shared/store/menu/menu-category';
import { useState } from 'react';
import PlusCategoryComponent from '../form/PlusCategory';
import CategroyCardPage from './Card';

const CategoryComponentPage = () => {
  const categories = useCategoriesStore(state => state.categories);
  const [dropNum, setDropNum] = useState(0);

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
            <PlusCategoryComponent />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CategoryComponentPage;
