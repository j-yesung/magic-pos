import { create } from 'zustand';

/**
 * 관리자 메뉴 추가를 위한 카테고리 관리 store
 */

interface CategoriesStoreType {
  isShow: boolean;
  toggleShow: (item: boolean) => void;
  category: CategoryType;
  setCategory: (item: CategoryType) => void;
  categories: CategoryType[];
  setCategories: (item: CategoryType[]) => void;
  addCategoryStore: (item: CategoryType) => void;
  removeCategoryStore: (item: CategoryType) => void;
  updateCategoryStore: (item: CategoryType) => void;
  dragCategoryStore: (dragItem: CategoryType, dragOver: CategoryType) => void;
}

const useCategoriesStore = create<CategoriesStoreType>(set => ({
  isShow: false,
  toggleShow: item => set({ isShow: item }),
  category: {
    id: '',
    store_id: '',
    name: '',
    position: 0,
  },
  setCategory: (item: CategoryType) => set(prev => ({ category: { ...prev.category, ...item } })),
  categories: [],
  setCategories: (item: CategoryType[]) => set({ categories: item }),
  addCategoryStore: (item: CategoryType) =>
    set(state => ({ categories: [...state.categories, { ...state.category, item }] })),
  removeCategoryStore: (item: CategoryType) =>
    set(state => ({ categories: state.categories.filter(it => it.id !== item.id) })),
  updateCategoryStore: (item: CategoryType) =>
    set(state => ({
      categories: state.categories.map(it => (it.id === item.id ? { ...it, name: item.name } : it)),
    })),
  dragCategoryStore: (dragItem: CategoryType, dragOver: CategoryType) =>
    set(state => ({
      categories: state.categories.map(it =>
        it.id === dragItem.id
          ? { id: dragOver.id, name: dragOver.name, store_id: dragOver.store_id, position: dragItem.position }
          : it.id === dragOver.id
          ? { id: dragItem.id, name: dragItem.name, store_id: dragItem.store_id, position: dragOver.position }
          : it,
      ),
    })),
}));

export default useCategoriesStore;
