import { EMPTY_MENU_ITEM } from '@/data/menu-item';
import { MENU_CATEGORY_PATH } from '@/data/url-list';
import useFetchMenuItems from '@/hooks/query/menu/menu-item/useFetchMenuItems';
import useFetchMenuOptions from '@/hooks/query/menu/menu-item/useFetchMenuOption';
import { fetchMenuOptions } from '@/server/api/supabase/menu-item';
import useMenuItemStore, {
  setCategoryWithMenuItem,
  setCategoryWithMenuItemList,
  setMenuItemList,
} from '@/shared/store/menu/menu-item';
import useMenuOptionStore, { setOrigineMenuOptions } from '@/shared/store/menu/menu-option';
import useAuthState from '@/shared/store/session';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MenuItemListPage from './items/MenuItemList';
import styles from './styles/menu-item-container.module.css';
import ExclamationMark from '/public/icons/exclamation-mark.svg';

const MenuItemsComponentPage = () => {
  const storeId = useAuthState(state => state.storeId);
  const { data: categoryWithMenuData, isLoading: menuItemLoading, isFetching } = useFetchMenuItems(storeId ?? '');
  const { data: menuOptionData, isLoading: menuOptionLoading } = useFetchMenuOptions();
  const router = useRouter();

  const categoryWithMenuItem = useMenuItemStore(state => state.categoryWithMenuItem);
  const categoryWithMenuItemList = useMenuItemStore(state => state.categoryWithMenuItemList);
  const changeMenuOptions = useMenuOptionStore(state => state.changeMenuOptions);

  const [choiceFetchData, setChoiceFetchData] = useState(false);

  useEffect(() => {
    if (categoryWithMenuData?.error === null) {
      setCategoryWithMenuItemList(categoryWithMenuData?.data);
      if (!isFetching) {
        setChoiceFetchData(true);
      }
    }
    if (menuOptionData?.error === null) {
      setOrigineMenuOptions(menuOptionData?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryWithMenuData, menuOptionData, isFetching]);

  useEffect(() => {
    if (choiceFetchData === true) {
      if (categoryWithMenuData?.error === null) {
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
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [choiceFetchData]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [changeMenuOptions]);

  const fetchData = async () => {
    const { data } = await fetchMenuOptions();
    setOrigineMenuOptions(data);
    return data;
  };

  if (menuItemLoading || menuOptionLoading) {
    // 데이터 로딩 중일 때
    return <div></div>;
  }

  return (
    <div
      className={clsx(styles.wrap, {
        [styles.empty]: categoryWithMenuItemList.length === 0,
      })}
    >
      <div className={styles['menu-container']}>
        {categoryWithMenuItemList.length === 0 ? (
          <div>
            <ExclamationMark width={121} height={121} />
            <h4>{EMPTY_MENU_ITEM.TITLE}</h4>
            <button type="button" onClick={() => router.push(MENU_CATEGORY_PATH)}>
              {EMPTY_MENU_ITEM.BUTTON}
            </button>
          </div>
        ) : (
          <MenuItemListPage />
        )}
      </div>
    </div>
  );
};

export default MenuItemsComponentPage;
