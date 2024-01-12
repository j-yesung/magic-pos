import { supabase } from '@/shared/supabase';
import { CategoryWithMenuItem } from '@/types/supabase';
/**
 * 특정 가게에 대한 카테고리만 가져온다
 * @param store_id 가게 고유 아이디
 */
export const fetchCategories = async (store_id: string) => {
  const { data, error } = await supabase
    .from('menu_category')
    .select('*')
    .eq('store_id', store_id)
    .order('position', { ascending: true })
    .returns<CategoryType[]>();
  if (error) throw error;
  return { data, error };
};

/**
 * 카테고리 추가하기
 * @param values 가게 id, 카테고리 name, 카테고리 순서
 * @returns data
 */
export const addCategory = async (store_id: string, name: string, position: number) => {
  const { data, error } = await supabase
    .from('menu_category')
    .insert([{ store_id: store_id, name, position }])
    .select();
  if (error) throw error;
  return { data, error };
};
/**
 * 카테고리 삭제하기
 * @param values 카테고리 아이디
 */
export const removeCategory = async (categoryId: string) => {
  const { error } = await supabase.from('menu_category').delete().eq('id', categoryId);
  if (error) throw error;
};
/**
 * 카테고리 이름 수정하기
 * @param values 카테고리 id, 카테고리 name
 * @returns data
 */
export const updateCategoryName = async (categoryId: string, name: string) => {
  const { data, error } = await supabase.from('menu_category').update({ name }).eq('id', categoryId);
  if (error) throw error;
  return data;
};

/**
 * 카테고리 위치 수정하기
 * @param values 카테고리 id, 카테고리 position
 * @returns data
 */
export const updateCategoryPosition = async (categoryId: string, position: number) => {
  const { data, error } = await supabase.from('menu_category').update({ position }).eq('id', categoryId);
  if (error) throw error;
  return data;
};

/**
 * 특정 가게에 대한 카테고리와 메뉴아이템을 전부 가져온다
 * @param store_id 가게 고유 아이디
 */
export const fetchCategoriesWithMenuItemByStoreId = async (store_id: string) => {
  const { data, error } = await supabase
    .from('menu_category')
    .select('*, menu_item(*)')
    .eq('store_id', store_id)
    .order('position', { ascending: true })
    .returns<CategoryWithMenuItem[]>();
  if (error) {
    return { data: {}, error };
  }

  // 각 카테고리의 menu_item을 position 값에 따라 정렬
  const dataWithSortedMenuItems = data.map(category => ({
    ...category,
    menu_item: category.menu_item.sort((a, b) => a.position - b.position),
  }));

  return { data: dataWithSortedMenuItems, error };
};
