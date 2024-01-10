import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 관리 store
 */

interface MenuItemStoreType {
  isShow: boolean;
  toggleShow: (item: boolean) => void;
  menuItem: MenuItemType;
  setMenuItem: (item: MenuItemType) => void;
  menuItemList: MenuItemType[];
  setMenuItemList: (item: MenuItemType[]) => void;
  categoryWithMenuItem: CategoryWithItemType;
  setCategoryWithMenuItem: (item: CategoryWithItemType) => void;
  categoryWithMenuItemList: CategoryWithItemType[];
  setCategoryWithMenuItemList: (item: CategoryWithItemType[]) => void;
  addMenuItemStore: (item: MenuItemType) => void;
  removeMenuItemStore: (item: MenuItemType) => void;
  updateMenuItemStore: (item: MenuItemType) => void;
}

const useMenuItemStore = create<MenuItemStoreType>(set => ({
  isShow: false,
  toggleShow: item => set({ isShow: item }),
  menuItem: {
    id: '',
    category_id: '',
    image_url: '',
    name: '',
    price: 0,
    remain_ea: 0,
  },
  setMenuItem: (item: MenuItemType) => set(prev => ({ menuItem: { ...prev.menuItem, ...item } })),
  menuItemList: [],
  setMenuItemList: (item: MenuItemType[]) => set({ menuItemList: item }),
  categoryWithMenuItem: {
    id: '',
    store_id: '',
    name: '',
    position: 0,
    menu_item: [],
  },
  setCategoryWithMenuItem: (item: CategoryWithItemType) =>
    set(prev => ({ categoryWithMenuItem: { ...prev.categoryWithMenuItem, ...item } })),
  categoryWithMenuItemList: [],
  setCategoryWithMenuItemList: (item: CategoryWithItemType[]) => set({ categoryWithMenuItemList: item }),
  addMenuItemStore: (newMenuItem: MenuItemType) =>
    set(state => ({
      ...state,
      categoryWithMenuItemList: state.categoryWithMenuItemList.map(category =>
        category.id === newMenuItem.category_id
          ? {
              ...category,
              menu_item: [...category.menu_item, newMenuItem],
            }
          : category,
      ),
    })),
  removeMenuItemStore: (removeMenuItem: MenuItemType) =>
    set(state => ({
      ...state,
      categoryWithMenuItemList: state.categoryWithMenuItemList.map(category =>
        category.id === removeMenuItem.category_id
          ? {
              ...category,
              menu_item: category.menu_item.filter(item => item.id !== removeMenuItem.id),
            }
          : category,
      ),
    })),
  updateMenuItemStore: (updatedMenuItem: MenuItemType) =>
    set(state => ({
      ...state,
      categoryWithMenuItemList: state.categoryWithMenuItemList.map(category =>
        category.id === updatedMenuItem.category_id
          ? {
              ...category,
              menu_item: category.menu_item.map(item =>
                item.id === updatedMenuItem.id ? { ...item, ...updatedMenuItem } : item,
              ),
            }
          : category,
      ),
    })),
}));

export default useMenuItemStore;
