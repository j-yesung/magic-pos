import useSetCategories from '@/hooks/menu-category/useSetCategories';
import useCategoriesStore from '@/shared/store/menu-category';
import useSideFormState from '@/shared/store/side-form';
import { TablesInsert } from '@/types/supabase';
import SideFormLayout from '../layout/admin/SideFormLayout';
import styles from './styles/form.module.css';

const CategoryFormPage = () => {
  const { setIsSideFormOpen } = useSideFormState();
  const { isEdit, category, setCategory, categories } = useCategoriesStore();
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
    setIsSideFormOpen(false);
    setCategory({ ...category, id: '', name: '' });
  };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = async () => {
    deleteMutate(category.id);
    setCategory({ ...category, id: '', name: '' });
    setIsSideFormOpen(false);
  };

  return (
    <SideFormLayout>
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

        {isEdit ? (
          <div className={styles['btn-wrap']}>
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
    </SideFormLayout>
  );
};

export default CategoryFormPage;
