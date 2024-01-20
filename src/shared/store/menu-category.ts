import { Tables } from '@/types/supabase';
import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 카테고리 관리 store
 */

interface CategoriesStoreType {
  isShow: boolean;
  toggleShow: (item: boolean) => void;
  isEdit: boolean;
  setIsEdit: (item: boolean) => void;
  category: Tables<'menu_category'>;
  setCategory: (item: Tables<'menu_category'>) => void;
  categories: Tables<'menu_category'>[];
  setCategories: (item: Tables<'menu_category'>[]) => void;
}

const useCategoriesStore = create<CategoriesStoreType>(set => ({
  isShow: false,
  toggleShow: item => set({ isShow: item }),
  isEdit: false,
  setIsEdit: item => set({ isEdit: item }),
  category: {
    id: '',
    store_id: '',
    name: '',
    position: 0,
  },
  setCategory: (item: Tables<'menu_category'>) => set(prev => ({ category: { ...prev.category, ...item } })),
  categories: [],
  setCategories: (item: Tables<'menu_category'>[]) => set({ categories: item }),
}));

export default useCategoriesStore;
