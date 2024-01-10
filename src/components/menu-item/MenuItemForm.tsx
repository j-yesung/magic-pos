import useMenuItemStore from '@/shared/store/menu-item';
import Image from 'next/image';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormPage = () => {
  const { menuItem, setMenuItem, menuItemList, setMenuItemList, updateMenuItemStore } = useMenuItemStore();

  // 메뉴 input handler
  const changeMenuItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, maxLength, name } = e.target;
    setMenuItem({ ...menuItem, [name]: value.slice(0, maxLength) });
  };

  // 메뉴 수정
  const submitupdateMenuItemHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateMenuItemStore(menuItem);
    console.log(menuItem);
    // await updateCategoryName(category.id, category.name);
    // setCategory({ ...category, name: '' });
  };

  // 메뉴 삭제
  const clickRemoveCategoryHandler = async () => {
    // removeCategoryStore(category);
    // setCategory({ ...category, id: '', name: '' });
    // await removeCategory(category.id);
  };

  return (
    <form onSubmit={submitupdateMenuItemHandler} className={styles['wrap']}>
      <h3>메뉴 사진</h3>
      <Image src={menuItem.image_url} alt={menuItem.name} width={200} height={200} />
      <input
        type="text"
        onChange={changeMenuItemHandler}
        name="name"
        value={menuItem.image_url}
        minLength={2}
        maxLength={20}
      />
      <h3>메뉴 명</h3>
      <input
        type="text"
        onChange={changeMenuItemHandler}
        name="name"
        value={menuItem.name}
        minLength={2}
        maxLength={20}
      />
      <h3>메뉴 가격</h3>
      <input
        type="number"
        onChange={changeMenuItemHandler}
        name="price"
        value={menuItem.price}
        minLength={2}
        maxLength={20}
      />
      <h3>메뉴 수량</h3>
      <input
        type="number"
        onChange={changeMenuItemHandler}
        name="remain_ea"
        value={menuItem.remain_ea}
        minLength={2}
        maxLength={20}
      />
      {/* <h3>추천 메뉴</h3>
      <input
        type="checkbox"
        onChange={changeMenuItemHandler}
        name="remain_ea"
        value={menuItem.remain_ea}
        minLength={2}
        maxLength={20}
      /> */}

      <div>
        <button className={styles['update-btn']} type="submit">
          수정 완료
        </button>
        <button className={styles['delete-btn']} type="button" onClick={clickRemoveCategoryHandler}>
          메뉴 삭제
        </button>
      </div>
    </form>
  );
};

export default MenuItemFormPage;
