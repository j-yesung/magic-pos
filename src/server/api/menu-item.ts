import { supabase } from '@/shared/supabase';

/**
 * 메뉴 물품 추가하기
 * @param values 가게 id, 카테고리 name, 카테고리 순서
 * @returns data
 */
export const addMenuItem = async (
  category_id: string,
  name: string,
  image_url: string,
  price: number,
  remain_ea: number,
) => {
  const { data, error } = await supabase
    .from('menu_item')
    .insert([{ category_id, name, image_url, price, remain_ea }])
    .select();
  if (error) throw error;
  return { data, error };
};

/**
 * 메뉴 물품 삭제하기
 * @param values 메뉴 물품 아이디
 */
export const removeMenuItem = async (menuId: string) => {
  const { error } = await supabase.from('menu_item').delete().eq('id', menuId);
  if (error) throw error;
};

/**
 * 메뉴 물품 이름 수정하기
 * @param values 메뉴 id, 메뉴 name
 * @returns data
 */
export const updateCategoryName = async (
  categoryId: string,
  name: string,
  image_url: string,
  price: number,
  remain_ea: number,
) => {
  const { data, error } = await supabase
    .from('menu_item')
    .update({ name, image_url, price, remain_ea })
    .eq('id', categoryId);
  if (error) throw error;
  return data;
};
