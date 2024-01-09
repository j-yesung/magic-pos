import { removeCategory, updateCategoryName } from '@/pages/api/menu-category';
import useCategoriesStore from '@/shared/store/menu-category';

const CategoryFormPage = () => {
  const { category, setCategory, removeCategoryStore, updateCategoryStore } = useCategoriesStore();

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
  };

  // 카테고리 삭제
  const clickRemoveCategoryHandler = async () => {
    removeCategoryStore(category);
    setCategory({ ...category, id: '', name: '' });
    await removeCategory(category.id);
  };

  return (
    <form onSubmit={submitupdateCategoryNameHandler}>
      <input
        type="text"
        onChange={changeCategoryHandler}
        name="name"
        value={category.name}
        minLength={2}
        maxLength={10}
        className="border-[#ccc] border-[1px] rounded-[10px]"
      />

      <button type="submit">수정</button>
      <button type="button" onClick={clickRemoveCategoryHandler}>
        삭제
      </button>
    </form>
  );
};

export default CategoryFormPage;
