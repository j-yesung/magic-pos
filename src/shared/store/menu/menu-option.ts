import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 옵션 추가를 위한 물품 관리 store
 */

interface MenuItemStoreType {
  menuOption: MenuOptionWithDetail;
  setMenuOption: (item: MenuOptionWithDetail) => void;
  menuOptions: MenuOptionWithDetail[];
  setMenuOptions: (item: MenuOptionWithDetail[]) => void;
  origineMenuOptions: MenuOptionWithDetail[];
  setOrigineMenuOptions: (item: MenuOptionWithDetail[]) => void;
  changeMenuOptions: MenuOptionWithDetail[];
  setChangeMenuOptions: (item: MenuOptionWithDetail[]) => void;
  removeMenuOptions: MenuOptionWithDetail[];
  setRemoveMenuOptions: (item: MenuOptionWithDetail[]) => void;
  menuOptionDetailList: Tables<'menu_option_detail'>[];
  setMenuOptionDetailList: (item: Tables<'menu_option_detail'>[]) => void;
  menuOptionIndex: number;
  setMenuOptionIndex: (item: number) => void;
  updateMenuOptionsStore: (item: (prev: MenuOptionWithDetail[]) => MenuOptionWithDetail[]) => void;
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
  setMenuOption: (item: MenuOptionWithDetail) => set(prev => ({ menuOption: { ...prev.menuOption, ...item } })),
  menuOptions: [],
  setMenuOptions: (item: MenuOptionWithDetail[]) => set({ menuOptions: item }),
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
  updateMenuOptionsStore: item => set(state => ({ menuOptions: item(state.menuOptions) })),
}));

export default useMenuOptionStore;
