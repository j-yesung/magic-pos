import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 관리 store
 */

interface MenuItemStoreType {
  menuItem: MenuItemType;
  setMenuItem: (item: MenuItemType) => void;
  menuItemList: MenuItemType[];
  setMenuItemList: (item: MenuItemType[]) => void;
  categoryWithMenuItem: CategoryWithItemType;
  setCategoryWithMenuItem: (item: CategoryWithItemType) => void;
  categoryWithMenuItemList: CategoryWithItemType[];
  setCategoryWithMenuItemList: (item: CategoryWithItemType[]) => void;
  addMenuItemStore: (item: MenuItemType) => void;
  // removeMenuItemStore: (item: MenuItemType) => void;
  // updateMenuItemStore: (item: MenuItemType) => void;
}

const useMenuItemStore = create<MenuItemStoreType>(set => ({
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
  // addMenuItemStore: (item: MenuItemType) =>
  //   set(state => {
  //     const updatedCategoryList = state.categoryWithMenuItemList.map(category => {
  //       if (category.id === item.category_id) {
  //         const updatedMenuItems = category.menu_item.map(it => {
  //           if (it.id === item.id) {
  //             return {
  //               ...it,
  //               name: item.name,
  //               price: item.price,
  //             };
  //           }
  //           return it;
  //         });

  //         return {
  //           ...category,
  //           menu_item: updatedMenuItems,
  //         };
  //       }
  //       return category;
  //     });

  //     return {
  //       categoryWithMenuItemList: updatedCategoryList,
  //     };
  //   }),
  addMenuItemStore: newMenuItem =>
    set(state => {
      const { categoryWithMenuItemList } = state;
      const categoryIndex = categoryWithMenuItemList.findIndex(category => category.id === newMenuItem.category_id);

      if (categoryIndex !== -1) {
        const category = categoryWithMenuItemList[categoryIndex];
        const menuItemIndex = category.menu_item.findIndex(item => item.id === newMenuItem.id);

        if (menuItemIndex !== -1) {
          // Update existing menu item
          const updatedCategoryList = [...categoryWithMenuItemList];
          updatedCategoryList[categoryIndex] = {
            ...category,
            menu_item: [
              ...category.menu_item.slice(0, menuItemIndex),
              { ...category.menu_item[menuItemIndex], ...newMenuItem },
              ...category.menu_item.slice(menuItemIndex + 1),
            ],
          };

          console.log('Updated categoryWithMenuItemList:', updatedCategoryList);

          return {
            categoryWithMenuItemList: updatedCategoryList,
          };
        }
      }

      // If the category or menu item does not exist, handle accordingly (e.g., add a new category or throw an error)
      return state;
    }),
  // addMenuItemStore: (item: MenuItemType) =>
  // set(state => ({ categoryWithMenuItemList: state.categoryWithMenuItemList, [ ...state.categoryWithMenuItemList, { ...state.menuItem, item }] })),
  // removeMenuItemStore: (item: MenuItemType) =>
  //   set(state => ({ categories: state.categories.filter(it => it.id !== item.id) })),
  // updateMenuItemStore: (item: MenuItemType) =>
  //   set(state => ({
  //     categoryWithMenuItemList: state.categoryWithMenuItemList.map(it =>
  //       it.id === item.id ? { ...it, name: item.name, price: item.price } : it,
  //     ),
  //   })),
}));

export default useMenuItemStore;
