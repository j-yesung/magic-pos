import { MENU_TITLE } from '@/data/menu-item';
import { useModal } from '@/hooks/service/ui/useModal';
import useCategoriesStore from '@/shared/store/menu/menu-category';
import CategoryFormPage from '../container/form/FormCategory';
import styles from '../styles/modal.module.css';
import CloseButton from '/public/icons/close.svg';

const MenuCategoryModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const isEdit = useCategoriesStore(state => state.isEdit);

  const clickCategoryModalHide = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['menu-category-modal']}>
      <div className={styles['menu-modal-top']}>
        {isEdit ? (
          <h3 className={styles['title']}>{MENU_TITLE.CATEGORY_EDIT}</h3>
        ) : (
          <h3 className={styles['title']}>{MENU_TITLE.CATEGORY_ADD}</h3>
        )}
        <div className={styles['close-button']}>
          <CloseButton width={26} height={26} onClick={clickCategoryModalHide} />
        </div>
      </div>
      <div className={styles['line']}></div>
      <div className={styles['box']}>
        <CategoryFormPage clickCategoryModalHide={clickCategoryModalHide} />
      </div>
    </div>
  );
};

export default MenuCategoryModal;
