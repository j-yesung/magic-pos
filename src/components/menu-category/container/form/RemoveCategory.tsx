import styles from '@/components/menu-category/styles/category.module.css';
import useSetCategories from '@/hooks/menu/menu-category/useSetCategories';
import { useModal } from '@/hooks/service/ui/useModal';
import useCategoriesStore, { setCategory } from '@/shared/store/menu/menu-category';
import { Tables } from '@/types/supabase';
import CloseButton from '/public/icons/close.svg';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

interface PropsType {
  item: Tables<'menu_category'>;
}

const RemoveCategoryComponent = ({ item }: PropsType) => {
  const { MagicModal } = useModal();
  const { deleteMutate } = useSetCategories();
  const category = useCategoriesStore(state => state.category);

  // 카테고리 삭제
  const clickRemoveCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: '카테고리를 삭제할까요?',
      confirmButtonCallback: () => {
        deleteMutate(item.id);
        setCategory({ ...category, id: '', name: '' });
      },
    });
  };
  return (
    <span className={styles['remove-btn']} onClick={() => clickRemoveCategoryHandler(item)}>
      <CloseButton width={15} height={15} />
    </span>
  );
};

export default RemoveCategoryComponent;
