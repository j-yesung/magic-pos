import MenuCategoryModal from '@/components/menu-category/modal/MenuCategoryModal';
import styles from '@/components/menu-category/styles/modal.module.css';
import { useModal } from '@/hooks/service/ui/useModal';
import useCategoriesStore, { setCategory, setIsEdit } from '@/shared/store/menu/menu-category';
import PlusButton from '/public/icons/plus.svg';

const PlusCategoryComponent = () => {
  const { MagicModal } = useModal();
  const category = useCategoriesStore(state => state.category);

  // 카테고리 플러스
  const clickAddCategoryHandler = async () => {
    MagicModal.fire(<MenuCategoryModal />);
    setIsEdit(false);
    setCategory({ ...category, id: '', name: '' });
  };
  return (
    <button className={styles['plus-btn']} type="button" onClick={() => clickAddCategoryHandler()}>
      <PlusButton width={22} height={22} />
    </button>
  );
};

export default PlusCategoryComponent;
