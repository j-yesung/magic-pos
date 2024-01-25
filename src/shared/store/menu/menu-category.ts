import { Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 카테고리 관리 store
 */

/**
 * STATE
 */
interface CategoriesStoreType {
  isEdit: boolean;
  category: Tables<'menu_category'>;
  categories: Tables<'menu_category'>[];
}

/**
 * VALUE
 */
const useCategoriesStore = create<CategoriesStoreType>()(() => ({
  isEdit: false,
  category: {
    id: '',
    store_id: '',
    name: '',
    position: 0,
  },
  categories: [],
}));

/**
 * ACTIONS
 */
export const setIsEdit = (isEdit: boolean) => useCategoriesStore.setState(() => ({ isEdit }));
export const setCategory = (item: Tables<'menu_category'>) =>
  useCategoriesStore.setState(state => ({ ...state, category: item }));
export const setCategories = (item: Tables<'menu_category'>[]) =>
  useCategoriesStore.setState(state => ({ ...state, categories: item }));

export default useCategoriesStore;
