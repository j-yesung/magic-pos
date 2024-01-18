import useSetCategories from '@/hooks/menu-category/useSetCategories';
import useCategoriesStore from '@/shared/store/menu-category';
import { TablesInsert } from '@/types/supabase';
import styles from './styles/form.module.css';

const CategoryFormPage = () => {
  const { isShow, toggleShow, isEdit, category, setCategory, categories } = useCategoriesStore();
  const { addMutate, updateNameMutate, deleteMutate } = useSetCategories();

  // 카테고리 input handler
  const changeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    setCategory({ ...category, [name]: value.slice(0, maxLength) });
  };

  // 카테고리 new data
  const newStoreTableData: TablesInsert<'menu_category'> = {
    name: category.name,
    store_id: category.store_id,
    position: categories.length,
  };

  // 카테고리 등록 및 수정
  const submitupdateCategoryNameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isEdit ? updateNameMutate(category) : addMutate(newStoreTableData);
    toggleShow(false);
    setCategory({ ...category, id: '', name: '' });
  };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = async () => {
    deleteMutate(category.id);
    setCategory({ ...category, id: '', name: '' });
    toggleShow(false);
  };

  return (
    <form
      onSubmit={submitupdateCategoryNameHandler}
      className={isShow ? `${styles['wrap']} ${styles['active']}` : `${styles['wrap']}`}
    >
      <h3>카테고리명</h3>
      <input
        type="text"
        onChange={changeCategoryHandler}
        name="name"
        value={category.name ?? ''}
        placeholder="카테고리명을 입력하세요."
        required
        minLength={1}
        maxLength={10}
      />

      {isEdit ? (
        <div>
          <button className={styles['update-btn']} type="submit">
            수정
          </button>
          <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
            카테고리 삭제
          </button>
        </div>
      ) : (
        <div>
          <button className={styles['update-btn']} type="submit">
            추가
          </button>
        </div>
      )}
    </form>
  );
};

export default CategoryFormPage;
