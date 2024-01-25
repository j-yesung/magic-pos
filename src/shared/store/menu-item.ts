import { CategoryWithMenuItem, MenuOptionWithDetail, Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 관리 store
 */

interface MenuItemStoreType {
  sampleImage: string;
  isShow: boolean;
  toggleShow: (item: boolean) => void;
  isEdit: boolean;
  setIsEdit: (item: boolean) => void;
  menuItem: Tables<'menu_item'>;
  setMenuItem: (item: Tables<'menu_item'>) => void;
  menuItemList: Tables<'menu_item'>[];
  setMenuItemList: (item: Tables<'menu_item'>[]) => void;
  categoryWithMenuItem: CategoryWithMenuItem;
  setCategoryWithMenuItem: (item: CategoryWithMenuItem) => void;
  categoryWithMenuItemList: CategoryWithMenuItem[];
  setCategoryWithMenuItemList: (item: CategoryWithMenuItem[]) => void;
  menuItemImgFile: File | null;
  setMenuItemImgFile: (item: File | null) => void;
  menuItemSampleImg: string;
  setMenuItemSampleImg: (item: string) => void;
  menuOption: MenuOptionWithDetail;
  setMenuOption: (item: MenuOptionWithDetail) => void;
  menuOptions: MenuOptionWithDetail[];
  setMenuOptions: (item: MenuOptionWithDetail[]) => void;
  updateMenuOptionsStore: (item: (prev: MenuOptionWithDetail[]) => MenuOptionWithDetail[]) => void;
  origineMenuOptions: MenuOptionWithDetail[];
  setOrigineMenuOptions: (item: MenuOptionWithDetail[]) => void;
  changeMenuOptions: MenuOptionWithDetail[];
  setChangeMenuOptions: (item: MenuOptionWithDetail[]) => void;
  removeMenuOptions: MenuOptionWithDetail[];
  setRemoveMenuOptions: (item: MenuOptionWithDetail[]) => void;
  // 메뉴 옵션 디테일
  menuOptionDetailList: Tables<'menu_option_detail'>[];
  setMenuOptionDetailList: (item: Tables<'menu_option_detail'>[]) => void;
  menuOptionIndex: number;
  setMenuOptionIndex: (item: number) => void;
}

const useMenuItemStore = create<MenuItemStoreType>(set => ({
  sampleImage: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/images/menu_sample/2024-01-12T07:53:35.815Z`,
  isShow: false,
  toggleShow: item => set({ isShow: item }),
  isEdit: false,
  setIsEdit: item => set({ isEdit: item }),
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
  menuItemImgFile: null,
  setMenuItemImgFile: item => set({ menuItemImgFile: item }),
  menuItemSampleImg: '',
  setMenuItemSampleImg: item => set({ menuItemSampleImg: item }),
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
  removeMenuOptions: [],
  setRemoveMenuOptions: (item: MenuOptionWithDetail[]) => set({ removeMenuOptions: item }),
  menuOptionDetailList: [],
  setMenuOptionDetailList: (item: Tables<'menu_option_detail'>[]) => set({ menuOptionDetailList: item }),
  menuOptionIndex: 0,
  setMenuOptionIndex: (item: number) => set({ menuOptionIndex: item }),
}));

export default useMenuItemStore;
