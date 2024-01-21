import useSetCategories from '@/hooks/menu/menu-category/useSetCategories';
import useCategoriesStore from '@/shared/store/menu-category';
import { TablesInsert } from '@/types/supabase';
import styles from './styles/form.module.css';

interface MenuCategoryModal {
  clickCategoryModalHide: () => void;
}

const CategoryFormPage: React.FC<MenuCategoryModal> = props => {
  const { isEdit, category, setCategory, categories } = useCategoriesStore();
  const { addMutate, updateNameMutate } = useSetCategories();

  // 카테고리 input handler
  const changeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    setCategory({ ...category, [name]: value.slice(0, maxLength) });
  };

  // 카테고리 new data
  const newCategoryData: TablesInsert<'menu_category'> = {
    name: category.name,
    store_id: category.store_id,
    position: categories.length,
  };

  // 카테고리 등록 및 수정
  const submitupdateCategoryNameHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    isEdit ? updateNameMutate(category) : addMutate(newCategoryData);
    setCategory({ ...category, id: '', name: '' });
    props.clickCategoryModalHide();
  };

  return (
    <form onSubmit={submitupdateCategoryNameHandler} className={styles['wrap']}>
      <div className={styles['input-wrap']}>
        <label className={styles['input-name']} htmlFor="name">
          카테고리명
        </label>
        <input
          type="text"
          onChange={changeCategoryHandler}
          className={styles['input']}
          id="name"
          name="name"
          value={category.name ?? ''}
          placeholder="카테고리명을 입력하세요."
          required
          minLength={1}
          maxLength={10}
        />
      </div>

      <div className={styles['btn-wrap']}>
        <button className={styles['delete-btn']} type="button" onClick={props.clickCategoryModalHide}>
          취소
        </button>
        <button className={styles['update-btn']} type="submit">
          확인
        </button>
      </div>
    </form>
  );
};

export default CategoryFormPage;
