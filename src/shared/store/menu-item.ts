import { CategoryWithMenuItem, MenuOptionWithDetail, Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 관리 store
 */

interface MenuItemStoreType {
  sampleImage: string;
  isShow: boolean;
  toggleShow: (item: boolean) => void;
  menuItem: Tables<'menu_item'>;
  setMenuItem: (item: Tables<'menu_item'>) => void;
  menuItemList: Tables<'menu_item'>[];
  setMenuItemList: (item: Tables<'menu_item'>[]) => void;
  categoryWithMenuItem: CategoryWithMenuItem;
  setCategoryWithMenuItem: (item: CategoryWithMenuItem) => void;
  categoryWithMenuItemList: CategoryWithMenuItem[];
  setCategoryWithMenuItemList: (item: CategoryWithMenuItem[]) => void;
  addMenuItemStore: (item: Tables<'menu_item'>) => void;
  removeMenuItemStore: (item: Tables<'menu_item'>) => void;
  updateMenuItemStore: (item: Tables<'menu_item'>) => void;
  menuItemImgFile: File | null;
  setMenuItemImgFile: (item: File | null) => void;
  menuItemSampleImg: string;
  setMenuItemSampleImg: (item: string) => void;
  dragMenuItemStore: (dragItem: Tables<'menu_item'>, dragOver: Tables<'menu_item'>) => void;
  menuOption: MenuOptionWithDetail;
  setMenuOption: (item: MenuOptionWithDetail) => void;
  menuOptions: MenuOptionWithDetail[];
  setMenuOptions: (item: MenuOptionWithDetail[]) => void;
  updateMenuOptionsStore: (item: (prev: MenuOptionWithDetail[]) => MenuOptionWithDetail[]) => void;
  origineMenuOptions: MenuOptionWithDetail[];
  setOrigineMenuOptions: (item: MenuOptionWithDetail[]) => void;
  changeMenuOptions: MenuOptionWithDetail[];
  setChangeMenuOptions: (item: MenuOptionWithDetail[]) => void;
  updateChangeMenuOptionsStore: (item: (prev: MenuOptionWithDetail[]) => MenuOptionWithDetail[]) => void;
  removeChangeMenuOptionsStore: (item: MenuOptionWithDetail) => void;
  // 메뉴 옵션 디테일
  menuOptionDetailList: Tables<'menu_option_detail'>[];
  setMenuOptionDetailList: (item: Tables<'menu_option_detail'>[]) => void;
  menuOptionIndex: number;
  setMenuOptionIndex: (item: number) => void;
}

const getDragObject = (drag: Omit<Tables<'menu_item'>, 'positon'>) => {
  return {
    id: drag.id,
    name: drag.name,
    price: drag.price,
    remain_ea: drag.remain_ea,
    image_url: drag.image_url,
    recommended: drag.recommended,
  };
};

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
  setMenuItem: (item: Tables<'menu_item'>) => set(prev => ({ menuItem: { ...prev.menuItem, ...item } })),
  menuItemList: [],
  setMenuItemList: (item: Tables<'menu_item'>[]) => set({ menuItemList: item }),
  categoryWithMenuItem: {
    id: '',
    store_id: '',
    name: '',
    position: 0,
    menu_item: [],
  },
  setCategoryWithMenuItem: (item: CategoryWithMenuItem) =>
    set(prev => ({ categoryWithMenuItem: { ...prev.categoryWithMenuItem, ...item } })),
  categoryWithMenuItemList: [],
  setCategoryWithMenuItemList: (item: CategoryWithMenuItem[]) => set({ categoryWithMenuItemList: item }),
  addMenuItemStore: (newMenuItem: Tables<'menu_item'>) =>
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
  removeMenuItemStore: (removeMenuItem: Tables<'menu_item'>) =>
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
  updateMenuItemStore: (updatedMenuItem: Tables<'menu_item'>) =>
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
  dragMenuItemStore: (dragItem: Tables<'menu_item'>, dragOver: Tables<'menu_item'>) =>
    set(state => ({
      ...state,
      categoryWithMenuItemList: state.categoryWithMenuItemList.map(category =>
        category.id === dragItem.category_id
          ? {
              ...category,
              menu_item: category.menu_item.map(item =>
                item.id === dragItem.id
                  ? {
                      ...item,
                      ...getDragObject(dragOver),
                      position: dragItem.position,
                    }
                  : item.id === dragOver.id
                  ? {
                      ...item,
                      ...getDragObject(dragItem),
                      position: dragOver.position,
                    }
                  : item,
              ),
            }
          : category,
      ),
      categoryWithMenuItem: {
        ...state.categoryWithMenuItem,
        menu_item: state.categoryWithMenuItem.menu_item.map(item =>
          item.id === dragItem.id
            ? {
                ...item,
                ...getDragObject(dragOver),
                position: dragItem.position,
              }
            : item.id === dragOver.id
            ? {
                ...item,
                ...getDragObject(dragItem),
                position: dragOver.position,
              }
            : item,
        ),
      },
    })),
  menuOption: {
    id: '',
    is_use: false,
    menu_id: '',
    name: '',
    menu_option_detail: [],
    max_detail_count: 1,
  },
  setMenuOption: (item: MenuOptionWithDetail) => set(prev => ({ menuOption: { ...prev.menuOption, ...item } })),
  menuOptions: [],
  setMenuOptions: (item: MenuOptionWithDetail[]) => set({ menuOptions: item }),
  updateMenuOptionsStore: item => set(state => ({ menuOptions: item(state.menuOptions) })),
  origineMenuOptions: [],
  setOrigineMenuOptions: (item: MenuOptionWithDetail[]) => set({ origineMenuOptions: item }),
  changeMenuOptions: [],
  setChangeMenuOptions: (item: MenuOptionWithDetail[]) => set({ changeMenuOptions: item }),
  updateChangeMenuOptionsStore: item => set(state => ({ changeMenuOptions: item(state.changeMenuOptions) })),
  removeChangeMenuOptionsStore: (item: MenuOptionWithDetail) => {
    set(state => ({
      origineMenuOptions: state.origineMenuOptions.filter(menu => menu.id !== item.id),
    }));
  },
  menuOptionDetailList: [],
  setMenuOptionDetailList: (item: Tables<'menu_option_detail'>[]) => set({ menuOptionDetailList: item }),
  menuOptionIndex: 0,
  setMenuOptionIndex: (item: number) => set({ menuOptionIndex: item }),
}));

export default useMenuItemStore;
