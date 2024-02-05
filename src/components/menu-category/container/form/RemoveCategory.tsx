import styles from '@/components/menu-category/styles/category.module.css';
import { MENU_TOAST } from '@/data/menu-item';
import useSetCategories from '@/hooks/query/menu/menu-category/useSetCategories';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import { useModal } from '@/hooks/service/ui/useModal';
import useCategoriesStore, { setCategory } from '@/shared/store/menu/menu-category';
import { Tables } from '@/types/supabase';
import CloseButton from '/public/icons/close.svg';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

interface PropsType {
  item: Tables<'menu_category'>;
}

const RemoveCategoryComponent = ({ item }: PropsType) => {
  const { showCompleteToast } = useMenuToast();
  const { MagicModal } = useModal();
  const { deleteMutate } = useSetCategories();
  const category = useCategoriesStore(state => state.category);

  // 카테고리 삭제
  const clickRemoveCategoryHandler = (item: Tables<'menu_category'>) => {
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: MENU_TOAST.CATEGORY_REMOVE_ALERT,
      confirmButtonCallback: () => {
        deleteMutate(item.id);
        setCategory({ ...category, id: '', name: '' });
        showCompleteToast(MENU_TOAST.CATEGORY_REMOVE, 'success');
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
