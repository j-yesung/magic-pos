import { supabase } from '@/shared/supabase';
import { Tables, TablesInsert, TablesUpdate } from '@/types/supabase';

/**
 * 메뉴 물품 추가하기
 * @param values 가게 id, 카테고리 name, 카테고리 순서
 * @returns data
 */

export const addMenuItem = async (menuItem: TablesInsert<'menu_item'>) => {
  const { data, error } = await supabase.from('menu_item').insert([menuItem]).select();
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
 * @param values 메뉴의 items
 * @returns data
 */
export const updateMenuItem = async (menuItem: TablesUpdate<'menu_item'>) => {
  const { id, name, price, image_url, position, recommended, remain_ea } = menuItem;
  const { data, error } = await supabase
    .from('menu_item')
    .update({ name, price, image_url, position, recommended, remain_ea })
    .eq('id', id!);
  if (error) throw error;
  return data;
};

/**
 * 메뉴 물품 이미지 삭제
 * @param values 메뉴의 items
 * @returns data
 */
export const uploadMenuItem = async (menuItem: Tables<'menu_item'>, createAt: string, selectedFile: File) => {
  const { error, data } = await supabase.storage
    .from('images')
    .upload(`menu/${menuItem.category_id}/${menuItem.id}/${createAt}`, selectedFile, {
      // cacheControl: '3600',
      // upsert: false,
    });
  if (error) throw error;
  return { data, error };
};

export const downloadMenuItemUrl = async (menuItem: Tables<'menu_item'>, createAt: string) => {
  try {
    const { data } = await supabase.storage
      .from('images')
      .getPublicUrl(`menu/${menuItem.category_id}/${menuItem.id}/${createAt}`);

    return data.publicUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const removeMenuItemFromStorage = async (menuItem: Tables<'menu_item'>) => {
  const { data: list } = await supabase.storage.from('images').list(`menu/${menuItem.category_id}/${menuItem.id}`);
  const filesToRemove = list?.map(x => `menu/${menuItem.category_id}/${menuItem.id}/${x.name}`);

  const { error } = await supabase.storage.from('images').remove(filesToRemove!);
  if (error) console.error(error);
};

/**
 * 메뉴 위치 수정하기
 * @param values 메뉴 id, 메뉴 position
 * @returns data
 */
export const updateMenuItemPosition = async (menuItemId: string, position: number) => {
  const { data, error } = await supabase.from('menu_item').update({ position }).eq('id', menuItemId);
  if (error) throw error;
  return data;
};
