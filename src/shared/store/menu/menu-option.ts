import { Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 옵션 추가를 위한 물품 관리 store
 */

export interface NewOptionDetailType {
  id: string;
  name: string;
  option_id: string;
  price: string | number;
}
export interface NewMenuOptionWithDetail extends Tables<'menu_option'> {
  menu_option_detail: NewOptionDetailType[];
}
interface MenuItemStoreType {
  menuOption: NewMenuOptionWithDetail;
  setMenuOption: (item: NewMenuOptionWithDetail) => void;
  menuOptions: NewMenuOptionWithDetail[];
  setMenuOptions: (item: NewMenuOptionWithDetail[]) => void;
  origineMenuOptions: NewMenuOptionWithDetail[];
  setOrigineMenuOptions: (item: NewMenuOptionWithDetail[]) => void;
  changeMenuOptions: NewMenuOptionWithDetail[];
  setChangeMenuOptions: (item: NewMenuOptionWithDetail[]) => void;
  removeMenuOptions: NewMenuOptionWithDetail[];
  setRemoveMenuOptions: (item: NewMenuOptionWithDetail[]) => void;
  menuOptionDetail: NewOptionDetailType;
  setMenuOptionDetail: (item: NewOptionDetailType) => void;
  menuOptionDetailList: NewOptionDetailType[];
  setMenuOptionDetailList: (item: NewOptionDetailType[]) => void;
  menuOptionIndex: number;
  setMenuOptionIndex: (item: number) => void;
  updateMenuOptionsStore: (item: (prev: NewMenuOptionWithDetail[]) => NewMenuOptionWithDetail[]) => void;
}

const useMenuOptionStore = create<MenuItemStoreType>(set => ({
  menuOption: {
    id: '',
    is_use: false,
    menu_id: '',
    name: '',
    menu_option_detail: [],
    max_detail_count: 1,
  },
  setMenuOption: (item: NewMenuOptionWithDetail) => set(prev => ({ menuOption: { ...prev.menuOption, ...item } })),
  menuOptions: [],
  setMenuOptions: (item: NewMenuOptionWithDetail[]) => set({ menuOptions: item }),
  origineMenuOptions: [],
  setOrigineMenuOptions: (item: NewMenuOptionWithDetail[]) => set({ origineMenuOptions: item }),
  changeMenuOptions: [],
  setChangeMenuOptions: (item: NewMenuOptionWithDetail[]) => set({ changeMenuOptions: item }),
  removeMenuOptions: [],
  setRemoveMenuOptions: (item: NewMenuOptionWithDetail[]) => set({ removeMenuOptions: item }),
  menuOptionDetail: {
    id: '',
    name: '',
    option_id: '',
    price: '',
  },
  setMenuOptionDetail: (item: NewOptionDetailType) => set({ menuOptionDetail: item }),
  menuOptionDetailList: [],
  setMenuOptionDetailList: (item: NewOptionDetailType[]) => set(state => ({ ...state, menuOptionDetailList: item })),
  menuOptionIndex: 0,
  setMenuOptionIndex: (item: number) => set({ menuOptionIndex: item }),
  updateMenuOptionsStore: item => set(state => ({ menuOptions: item(state.menuOptions) })),
}));

export default useMenuOptionStore;
