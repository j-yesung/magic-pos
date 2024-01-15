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
  recommended: boolean,
  position: number,
) => {
  const { data, error } = await supabase
    .from('menu_item')
    .insert([{ category_id, name, image_url, price, remain_ea, recommended, position }])
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
 * @param values 메뉴의 items
 * @returns data
 */
export const updateMenuItem = async (menuItem: MenuItemType) => {
  const { data, error } = await supabase.from('menu_item').update(menuItem).eq('id', menuItem.id);
  if (error) throw error;
  return data;
};

/**
 * 메뉴 물품 이미지 삭제
 * @param values 메뉴의 items
 * @returns data
 */
export const uploadMenuItem = async (menuItem: MenuItemType, createAt: string, selectedFile: File) => {
  const { error, data } = await supabase.storage
    .from('images')
    .upload(`menu/${menuItem.category_id}/${menuItem.id}/${createAt}`, selectedFile, {
      // cacheControl: '3600',
      // upsert: false,
    });
  if (error) throw error;
  return { data, error };
};

export const downloadMenuItemUrl = async (menuItem: MenuItemType, createAt: string) => {
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

export const removeMenuItemFromStorage = async (menuItem: MenuItemType) => {
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
