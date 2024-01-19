import useFetchMenuItems from '@/hooks/menu/menu-item/useFetchMenuItems';
import useFetchMenuOptions from '@/hooks/menu/menu-item/useFetchMenuOption';
import { fetchMenuOptions } from '@/server/api/supabase/menu-item';
import useAuthStore from '@/shared/store/auth';
import useMenuItemStore from '@/shared/store/menu-item';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import MenuItemFormPage from './items/MenuItemForm';
import MenuItemListPage from './items/MenuItemList';
import styles from './styles/menu-item-container.module.css';

const MenuItemsComponentPage = () => {
  const { storeId } = useAuthStore();
  const { data: categoryWithMenuData } = useFetchMenuItems(storeId ?? '');
  const { data: menuOptionData } = useFetchMenuOptions();
  const router = useRouter();

  const {
    setMenuItemList,
    categoryWithMenuItem,
    setCategoryWithMenuItem,
    categoryWithMenuItemList,
    setCategoryWithMenuItemList,
    setMenuOptions,
    setOrigineMenuOptions,
    changeMenuOptions,
  } = useMenuItemStore();

  useEffect(() => {
    if (categoryWithMenuData?.error === null) {
      setCategoryWithMenuItemList(categoryWithMenuData?.data);
      if (categoryWithMenuData?.data.length > 0 && categoryWithMenuData?.data[0]) {
        setCategoryWithMenuItem({
          ...categoryWithMenuItem,
          id: categoryWithMenuData?.data[0].id, // 초기값 첫 카테고리 선택
          store_id: storeId ?? '',
          position: categoryWithMenuData?.data.length,
          menu_item: categoryWithMenuData?.data[0].menu_item, // 초기값 첫 카테고리 선택
        });
        setMenuItemList(categoryWithMenuData?.data[0].menu_item);
      }
    }
    if (menuOptionData?.error === null) {
      setMenuOptions(menuOptionData?.data);
      setOrigineMenuOptions(menuOptionData?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryWithMenuData, menuOptionData]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeMenuOptions]);

  const fetchData = async () => {
    const { data } = await fetchMenuOptions();
    setMenuOptions(data);
    setOrigineMenuOptions(data);
    return data;
  };

  return (
    <div
      className={clsx(styles.wrap, {
        [styles.empty]: categoryWithMenuItemList.length === 0,
      })}
    >
      <div className={styles['menu-container']}>
        {categoryWithMenuItemList.length === 0 ? (
          <div>
            <h4>
              메뉴의 카테고리를 <br />
              먼저 추가해주세요.
            </h4>
            <button type="button" onClick={() => router.push('/admin/menu-category')}>
              카테고리 페이지로 이동
            </button>
          </div>
        ) : (
          <>
            <MenuItemListPage />
            <MenuItemFormPage />
          </>
        )}
      </div>
    </div>
  );
};

export default MenuItemsComponentPage;
