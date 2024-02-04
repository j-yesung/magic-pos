import styles from '@/components/menu-category/styles/form.module.css';
import useSetCategories from '@/hooks/query/menu/menu-category/useSetCategories';
import useToast from '@/hooks/service/ui/useToast';
import useCategoriesStore, { setCategory } from '@/shared/store/menu/menu-category';
import { TablesInsert } from '@/types/supabase';
import AddCategoryComponent from './AddCategory';
import InputCategoryComponent from './InputCategory';

interface MenuCategoryModal {
  clickCategoryModalHide: () => void;
}

const CategoryFormPage: React.FC<MenuCategoryModal> = props => {
  const { toast } = useToast();
  const isEdit = useCategoriesStore(state => state.isEdit);
  const category = useCategoriesStore(state => state.category);
  const categories = useCategoriesStore(state => state.categories);
  const { addMutate, updateNameMutate } = useSetCategories();

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
    toast(!isEdit ? '카테고리 등록 성공' : '카테고리 수정 성공', {
      type: 'success',
      position: 'top-center',
      showCloseButton: false,
      autoClose: 2000,
    });
  };

  return (
    <form onSubmit={submitupdateCategoryNameHandler} className={styles['wrap']}>
      <InputCategoryComponent />
      <AddCategoryComponent clickCategoryModalHide={props.clickCategoryModalHide} />
    </form>
  );
};

export default CategoryFormPage;
