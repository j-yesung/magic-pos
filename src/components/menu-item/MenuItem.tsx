import { addMenuItem } from '@/server/api/menu-item';
import useCategoriesStore from '@/shared/store/menu-category';
import useMenuItemStore from '@/shared/store/menu-item';
import Image from 'next/image';
import styles from './styles/menu-item.module.css';

const MenuItemPage = () => {
  const { category, setCategory, categories, setCategories } = useCategoriesStore();
  const {
    menuItem,
    setMenuItem,
    menuItemList,
    setMenuItemList,
    categoryWithMenuItem,
    setCategoryWithMenuItem,
    categoryWithMenuItemList,
    setCategoryWithMenuItemList,
    addMenuItemStore,
  } = useMenuItemStore();

  // 메뉴 플러스
  const clickAddMenuItemHandler = async () => {
    // toggleShow(true);
    const emptyValue = `임시 메뉴명`;
    const { data } = await addMenuItem(
      categoryWithMenuItem.id,
      emptyValue,
      'https://th.bing.com/th/id/R.a46e29755e91c233f9836e36c3c57677?rik=bGne%2fYEBDDFQzg&pid=ImgRaw&r=0',
      0,
      0,
    );
    const newMenuItem = {
      id: data[0].id,
      image_url: data[0].image_url || '',
      category_id: data[0].category_id,
      name: data[0].name || '',
      price: data[0].price,
      remain_ea: data[0].remain_ea || 0,
    };

    setMenuItem(newMenuItem);
    addMenuItemStore(newMenuItem);
    // setCategoryWithMenuItemList((prevList) => [...prevList, newMenuItem]);
    console.log(categoryWithMenuItemList);
  };

  // 메뉴 선택
  const clickChoiceCategoryHandler = (item: MenuItemType) => {
    setMenuItem({
      id: item.id,
      category_id: item.category_id,
      image_url: item.image_url,
      name: item.name,
      price: item.price,
      remain_ea: item.remain_ea,
    });
  };

  return (
    <div className={styles['wrap']}>
      <ul>
        {categoryWithMenuItemList
          .filter(list => list.id === categoryWithMenuItem.id)
          .map(categoryWithMenu =>
            categoryWithMenu.menu_item.map(item => (
              <li key={item.id} className={item.id === menuItem.id ? styles['active'] : ''}>
                <button type="button" onClick={() => clickChoiceCategoryHandler(item)}>
                  <span>
                    <Image src={item.image_url} alt={item.name} width={50} height={50} />
                  </span>
                  <span>name: {item.name}</span>
                  <span>price: {item.price}</span>
                  <span>remain_ea: {item.remain_ea}</span>
                </button>
              </li>
            )),
          )}
        <li>
          <button type="button" onClick={clickAddMenuItemHandler}>
            +
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MenuItemPage;
