import styles from '@/components/menu-category/styles/form.module.css';
import useCategoriesStore, { setCategory } from '@/shared/store/menu/menu-category';
import React from 'react';

const InputCategoryComponent = () => {
  const category = useCategoriesStore(state => state.category);

  // 카테고리 input handler
  const changeCategoryHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    setCategory({ ...category, [name]: value.slice(0, maxLength) });
  };
  return (
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
  );
};

export default InputCategoryComponent;
