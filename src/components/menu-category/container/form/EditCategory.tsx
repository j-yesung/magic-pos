import MenuCategoryModal from '@/components/menu-category/modal/MenuCategoryModal';
import styles from '@/components/menu-category/styles/category.module.css';
import { useModal } from '@/hooks/service/ui/useModal';
import { setCategory, setIsEdit } from '@/shared/store/menu/menu-category';
import { Tables } from '@/types/supabase';
import EditButton from '/public/icons/pencil.svg';

interface PropsType {
  item: Tables<'menu_category'>;
}

const EditCategoryComponent = ({ item }: PropsType) => {
  const { MagicModal } = useModal();

  // 카테고리 수정
  const clickChoiceCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.fire(<MenuCategoryModal />);
    setIsEdit(true);
    setCategory(item);
  };

  return (
    <span className={styles['edit-btn']} onClick={() => clickChoiceCategoryHandler(item)}>
      <EditButton width={16} height={16} />
    </span>
  );
};

export default EditCategoryComponent;
