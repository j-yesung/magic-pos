import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 관리 store
 */

interface MenuItemStoreType {
  sampleImage: string;
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
  menuItemImgFile: File | null;
  setMenuItemImgFile: (item: File | null) => void;
  menuItemSampleImg: string;
  setMenuItemSampleImg: (item: string) => void;
  dragMenuItemStore: (dragItem: MenuItemType, dragOver: MenuItemType) => void;
}

const useMenuItemStore = create<MenuItemStoreType>(set => ({
  sampleImage: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/menu_sample/2024-01-12T07:53:35.815Z`,
  isShow: false,
  toggleShow: item => set({ isShow: item }),
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
      categoryWithMenuItem: {
        ...state.categoryWithMenuItem,
        menu_item: [...state.categoryWithMenuItem.menu_item, newMenuItem],
      },
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
      categoryWithMenuItem: {
        ...state.categoryWithMenuItem,
        menu_item: state.categoryWithMenuItem.menu_item.filter(item => item.id !== removeMenuItem.id),
      },
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
      categoryWithMenuItem: {
        ...state.categoryWithMenuItem,
        menu_item: state.categoryWithMenuItem.menu_item.map(item =>
          item.id === updatedMenuItem.id ? { ...item, ...updatedMenuItem } : item,
        ),
      },
    })),
  menuItemImgFile: null,
  setMenuItemImgFile: item => set({ menuItemImgFile: item }),
  menuItemSampleImg: '',
  setMenuItemSampleImg: item => set({ menuItemSampleImg: item }),
  dragMenuItemStore: (dragItem: MenuItemType, dragOver: MenuItemType) =>
    set(state => ({
      ...state,
      categoryWithMenuItemList: state.categoryWithMenuItemList.map(category =>
        category.id === dragItem.category_id
          ? {
              ...category,
              menu_item: category.menu_item.map(it =>
                it.id === dragItem.id
                  ? {
                      ...it,
                      id: dragOver.id,
                      name: dragOver.name,
                      price: dragOver.price,
                      remain_ea: dragOver.remain_ea,
                      image_url: dragOver.image_url,
                      recommended: dragOver.recommended,
                      position: dragItem.position,
                    }
                  : it.id === dragOver.id
                  ? {
                      ...it,
                      id: dragItem.id,
                      name: dragItem.name,
                      price: dragItem.price,
                      remain_ea: dragItem.remain_ea,
                      image_url: dragItem.image_url,
                      recommended: dragItem.recommended,
                      position: dragOver.position,
                    }
                  : it,
              ),
            }
          : category,
      ),
      categoryWithMenuItem: {
        ...state.categoryWithMenuItem,
        menu_item: state.categoryWithMenuItem.menu_item.map(it =>
          it.id === dragItem.id
            ? {
                ...it,
                id: dragOver.id,
                name: dragOver.name,
                price: dragOver.price,
                remain_ea: dragOver.remain_ea,
                image_url: dragOver.image_url,
                recommended: dragOver.recommended,
                position: dragItem.position,
              }
            : it.id === dragOver.id
            ? {
                ...it,
                id: dragItem.id,
                name: dragItem.name,
                price: dragItem.price,
                remain_ea: dragItem.remain_ea,
                image_url: dragItem.image_url,
                recommended: dragItem.recommended,
                position: dragOver.position,
              }
            : it,
        ),
      },
    })),
}));

export default useMenuItemStore;
