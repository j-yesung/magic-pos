import styles from '@/components/menu-category/styles/form.module.css';

interface MenuCategoryModal {
  clickCategoryModalHide: () => void;
}

const AddCategoryComponent: React.FC<MenuCategoryModal> = props => {
  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['delete-btn']} type="button" onClick={props.clickCategoryModalHide}>
        취소
      </button>
      <button className={styles['update-btn']} type="submit">
        확인
      </button>
    </div>
  );
};

export default AddCategoryComponent;
