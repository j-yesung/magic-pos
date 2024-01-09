import { supabase } from '@/shared/supabase';
import { CategoryWithMenuItem } from '@/types/supabase';
/**
 * 카테고리 목록 가져오기 - DB에 저장되어있는 카테고리 목록
 * @returns 리뷰 목록
 */
export const fetchCategories = async () => {
  const { data, error } = await supabase.from('menu_category').select('*');
  if (error) throw error;
  return { data, error };
};
/**
 * 카테고리 추가하기
 * @param values 가게 id, 카테고리 name, 카테고리 순서
 * @returns data
 */
export const addCategory = async (storeId: string, name: string, position: number) => {
  const { data, error } = await supabase.from('menu_category').insert([{ store_id: storeId, name, position }]);
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
export const updateCategory = async (categoryId: string, name: string) => {
  const { data, error } = await supabase.from('menu_category').update({ name }).eq('id', categoryId);
  if (error) throw error;
  return data;
};

/**
 * 특정 가게에 대한 카테고리와 메뉴아이템을 전부 가져온다
 * @param storeId 가게 고유 아이디
 */
export const fetchCategoriesWithMenuItemByStoreId = async (storeId: string) => {
  const { data, error } = await supabase
    .from('menu_category')
    .select('*, menu_item(*)')
    .eq('store_id', storeId)
    .returns<CategoryWithMenuItem>();
  if (error) {
    return { data: {}, error };
  }
  return { data, error };
};
