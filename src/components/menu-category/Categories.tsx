import CategoryComponentPage from './Category';
import CategoryFormPage from './Form';
import styles from './styles/categories.module.css';

const CategoriesComponentPage = () => {
  return (
    <div className={styles['wrap']}>
      <h2 className={styles['category-h2']}>카테고리 등록하기</h2>
      <div className={styles['category-container']}>
        <CategoryComponentPage />
        <CategoryFormPage />
      </div>
    </div>
  );
};

export default CategoriesComponentPage;
