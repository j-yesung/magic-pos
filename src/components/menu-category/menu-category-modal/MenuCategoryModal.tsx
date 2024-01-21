import { useModal } from '@/hooks/modal/useModal';
import useCategoriesStore from '@/shared/store/menu-category';
import CategoryFormPage from '../Form';
import styles from '../styles/modal.module.css';
import CloseButton from '/public/icons/close.svg';

const MenuCategoryModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { isEdit, setIsEdit, category, setCategory, categories } = useCategoriesStore();

  const clickCategoryModalHide = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['menu-category-modal']}>
      {isEdit ? <h3 className={styles['title']}>카테고리 수정</h3> : <h3 className={styles['title']}>카테고리 등록</h3>}

      <div className={styles['close-button']}>
        <CloseButton width={26} height={26} onClick={clickCategoryModalHide} />
      </div>
      <div className={styles['line']}></div>
      <div className={styles['box']}>
        <CategoryFormPage clickCategoryModalHide={clickCategoryModalHide} />
      </div>
    </div>
  );
};

export default MenuCategoryModal;
