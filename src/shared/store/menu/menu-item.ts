import { CategoryWithMenuItem, Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 관리 store
 */

/**
 * STATE
 */
interface MenuItemStoreType {
  isEdit: boolean;
  menuItem: Tables<'menu_item'>;
  menuItemList: Tables<'menu_item'>[];
  categoryWithMenuItem: CategoryWithMenuItem;
  categoryWithMenuItemList: CategoryWithMenuItem[];
  menuItemImgFile: File | null;
  menuItemSampleImg: string;
}

/**
 * VALUE
 */
const useMenuItemStore = create<MenuItemStoreType>()(() => ({
  isEdit: false,
  categories: [],
  menuItem: {
    id: '',
    category_id: '',
    image_url: '',
    name: '',
    price: 0,
    remain_ea: 0,
    recommended: false,
    position: 0,
  },
  menuItemList: [],
  categoryWithMenuItem: {
    id: '',
    store_id: '',
    name: '',
    position: 0,
    menu_item: [],
  },
  categoryWithMenuItemList: [],
  menuItemImgFile: null,
  menuItemSampleImg: '',
}));

/**
 * ACTIONS
 */
export const setIsEdit = (isEdit: boolean) => useMenuItemStore.setState(() => ({ isEdit }));
export const setMenuItem = (item: Tables<'menu_item'>) =>
  useMenuItemStore.setState(prev => ({ menuItem: { ...prev.menuItem, ...item } }));
export const setMenuItemList = (item: Tables<'menu_item'>[]) => useMenuItemStore.setState({ menuItemList: item });
export const setCategoryWithMenuItem = (item: CategoryWithMenuItem) =>
  useMenuItemStore.setState(prev => ({ categoryWithMenuItem: { ...prev.categoryWithMenuItem, ...item } }));
export const setCategoryWithMenuItemList = (item: CategoryWithMenuItem[]) =>
  useMenuItemStore.setState({ categoryWithMenuItemList: item });
export const setMenuItemImgFile = (item: File | null) => useMenuItemStore.setState({ menuItemImgFile: item });
export const setMenuItemSampleImg = (item: string) => useMenuItemStore.setState({ menuItemSampleImg: item });

export default useMenuItemStore;
