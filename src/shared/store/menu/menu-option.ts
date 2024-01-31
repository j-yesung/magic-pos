import { Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 물품 옵션 관리 store
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
/**
 * STATE
 */
interface MenuItemStoreType {
  menuOption: NewMenuOptionWithDetail;
  menuOptions: NewMenuOptionWithDetail[];
  origineMenuOptions: NewMenuOptionWithDetail[];
  changeMenuOptions: NewMenuOptionWithDetail[];
  removeMenuOptions: NewMenuOptionWithDetail[];
  menuOptionDetail: NewOptionDetailType;
  menuOptionDetailList: NewOptionDetailType[];
  menuOptionIndex: number;
}

/**
 * VALUE
 */
const useMenuOptionStore = create<MenuItemStoreType>()(() => ({
  menuOption: {
    id: '',
    is_use: false,
    menu_id: '',
    name: '',
    menu_option_detail: [],
    max_detail_count: 1,
  },
  menuOptions: [],
  origineMenuOptions: [],
  changeMenuOptions: [],
  removeMenuOptions: [],
  menuOptionDetail: {
    id: '',
    name: '',
    option_id: '',
    price: '',
  },
  menuOptionDetailList: [],
  menuOptionIndex: 0,
}));

/**
 * ACTIONS
 */
export const setMenuOption = (item: NewMenuOptionWithDetail) =>
  useMenuOptionStore.setState(prev => ({ menuOption: { ...prev.menuOption, ...item } }));
export const setMenuOptions = (item: NewMenuOptionWithDetail[]) => useMenuOptionStore.setState({ menuOptions: item });
export const setOrigineMenuOptions = (item: NewMenuOptionWithDetail[]) =>
  useMenuOptionStore.setState({ origineMenuOptions: item });
export const setChangeMenuOptions = (item: NewMenuOptionWithDetail[]) =>
  useMenuOptionStore.setState({ changeMenuOptions: item });
export const setRemoveMenuOptions = (item: NewMenuOptionWithDetail[]) =>
  useMenuOptionStore.setState({ removeMenuOptions: item });
export const setMenuOptionDetail = (item: NewOptionDetailType) =>
  useMenuOptionStore.setState({ menuOptionDetail: item });
export const setMenuOptionDetailList = (item: NewOptionDetailType[]) =>
  useMenuOptionStore.setState(state => ({ ...state, menuOptionDetailList: item }));
export const setMenuOptionIndex = (item: number) => useMenuOptionStore.setState({ menuOptionIndex: item });
export const updateMenuOptionsStore = (item: (prev: NewMenuOptionWithDetail[]) => NewMenuOptionWithDetail[]) =>
  useMenuOptionStore.setState(state => ({ menuOptions: item(state.menuOptions) }));

export default useMenuOptionStore;
