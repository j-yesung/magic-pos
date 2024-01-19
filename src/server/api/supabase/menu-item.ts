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

/**
 * 메뉴 옵션 불러오기
 */
export const fetchMenuOptions = async () => {
  const { data, error } = await supabase.from('menu_option').select('*, menu_option_detail(*)');
  if (error) throw error;
  return { data, error };
};
/**
 * 메뉴 옵션 추가하기
 * @returns data
 */
export const addMenuOption = async (menuOption: TablesInsert<'menu_option'>) => {
  const { data, error } = await supabase.from('menu_option').insert([menuOption]).select();
  if (error) throw error;
  return { data, error };
};
/**
 * 메뉴 옵션 삭제하기
 * @param values 메뉴 물품 아이디
 */
export const removeMenuOption = async (menuOptionId: string) => {
  const { error } = await supabase.from('menu_option').delete().eq('id', menuOptionId);
  if (error) throw error;
};
/**
 * 메뉴 옵션 수정하기
 * @param values 메뉴의 items
 * @returns data
 */
export const updateMenuOption = async (menuOption: TablesUpdate<'menu_option'>) => {
  const { id, name, is_use, max_detail_count } = menuOption;
  const { error } = await supabase.from('menu_option').update({ name, is_use, max_detail_count }).eq('id', id!);
  if (error) throw error;
  return true;
};

/**
 * 메뉴 옵션 디테일 불러오기
 */
export const fetchMenuOptionDetail = async () => {
  const { data, error } = await supabase.from('menu_option_detail').select('*');
  if (error) throw error;
  return { data, error };
};
/**
 * 메뉴 옵션 디테일 추가하기
 * @returns data
 */
export const addMenuOptionDetail = async (optionDetail: TablesInsert<'menu_option_detail'>) => {
  const { data, error } = await supabase.from('menu_option_detail').insert([optionDetail]).select();
  if (error) throw error;
  return { data, error };
};
/**
 * 메뉴 옵션 디테일 upsert
 * @returns data
 */

export const addUpsertMenuOptionDetail = async (
  optionDetail: Omit<Tables<'menu_option_detail'>, 'id'> | Tables<'menu_option_detail'>,
) => {
  const { data, error } = await supabase.from('menu_option_detail').upsert([optionDetail]).select();
  if (error) throw error;
  return { data, error };
};

/**
 * 메뉴 옵션 디테일 삭제하기
 * @param values 메뉴 옵션 디테일 아이디
 */
export const removeMenuOptionDetail = async (optionDetailId: string) => {
  const { error } = await supabase.from('menu_option_detail').delete().eq('id', optionDetailId);
  if (error) throw error;
};
/**
 * 메뉴 옵션 디테일 이름 수정하기
 * @param values 메뉴의 items
 * @returns data
 */
export const updateMenuOptionDetail = async (optionDetail: TablesUpdate<'menu_option_detail'>) => {
  const { id, name, price } = optionDetail;
  const { data, error } = await supabase.from('menu_option_detail').update({ name, price }).eq('id', id!);
  if (error) throw error;
  return data;
};

export const readRemainEaByMenuId = async (menuId: string) => {
  const { data, error } = await supabase.from('menu_item').select('remain_ea, name, id').eq('id', menuId).single();
  if (error) throw error;
  return data;
};
