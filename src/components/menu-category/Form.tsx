import { removeCategory, updateCategoryName } from '@/pages/api/menu-category';
import useCategoriesStore from '@/shared/store/menu-category';
import styles from './styles/form.module.css';

const CategoryFormPage = () => {
  const { show, toggleShow, category, setCategory, removeCategoryStore, updateCategoryStore } = useCategoriesStore();

  // 카테고리 input handler
  const changeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    setCategory({ ...category, [name]: value.slice(0, maxLength) });
  };

  // 카테고리 수정
  const submitupdateCategoryNameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateCategoryStore(category);
    await updateCategoryName(category.id, category.name);
    setCategory({ ...category, name: '' });
    toggleShow(false);
  };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = async () => {
    removeCategoryStore(category);
    setCategory({ ...category, id: '', name: '' });
    await removeCategory(category.id);
    toggleShow(false);
  };

  return (
    <form
      onSubmit={submitupdateCategoryNameHandler}
      className={show ? `${styles['wrap']} ${styles['active']}` : `${styles['wrap']}`}
    >
      <h3>카테고리명</h3>
      <input
        type="text"
        onChange={changeCategoryHandler}
        name="name"
        value={category.name}
        minLength={2}
        maxLength={10}
      />

      <div>
        <button className={styles['update-btn']} type="submit">
          수정 완료
        </button>
        <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
          카테고리 삭제
        </button>
      </div>
    </form>
  );
};

export default CategoryFormPage;
