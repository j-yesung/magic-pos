import styles from '@/components/menu-category/styles/category.module.css';
import { DRAG_INFO } from '@/data/menu-item';
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
        <div className={styles['drag-info']}>{DRAG_INFO.MENU_CATEGORY}</div>
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
