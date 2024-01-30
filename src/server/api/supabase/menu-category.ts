import { supabase } from '@/shared/supabase';
import { CategoryWithMenuItem, Tables, TablesInsert, TablesUpdate } from '@/types/supabase';
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
    .returns<Tables<'menu_category'>[]>();
  if (error) throw error;
  return { data, error };
};

/**
 * 카테고리 추가하기
 * @param values 가게 id, 카테고리 name, 카테고리 순서
 * @returns data
 */
export const addCategory = async (categoryData: TablesInsert<'menu_category'>) => {
  const { error } = await supabase.from('menu_category').insert([categoryData]).select();
  if (error) throw new Error(error.message);
};

/**
 * 카테고리 삭제하기
 * @param values 카테고리 아이디
 */
export const removeCategory = async (categoryId: string) => {
  const { error } = await supabase.from('menu_category').delete().eq('id', categoryId);
  if (error) throw new Error(error.message);
};
/**
 * 카테고리 이름 수정하기
 * @param values 카테고리 id, 카테고리 name
 * @returns data
 */
export const updateCategoryName = async (categoryPick: Pick<TablesUpdate<'menu_category'>, 'id' | 'name'>) => {
  const { id, name } = categoryPick;
  const { error } = await supabase
    .from('menu_category')
    .update({ name })
    .eq('id', id ?? '');
  if (error) throw new Error(error.message);
};

/**
 * 카테고리 위치 수정하기
 * @param values 카테고리 id, 카테고리 position
 * @returns data
 */
type DragGroupType = {
  pick: TablesUpdate<'menu_category'>;
  over: TablesUpdate<'menu_category'>;
};
export const updateCategoryPosition = async (dragGroup: DragGroupType) => {
  const { id: pickId, position: pickPosition } = dragGroup.pick;
  const { id: overId, position: overPosition } = dragGroup.over;
  const { error: pickError } = await supabase
    .from('menu_category')
    .update({ position: overPosition })
    .eq('id', pickId ?? '');
  const { error: OverError } = await supabase
    .from('menu_category')
    .update({ position: pickPosition })
    .eq('id', overId ?? '');
  if (pickError && OverError) throw new Error(pickError.message);
};

/**
 * 특정 가게에 대한 카테고리와 메뉴아이템을 전부 가져온다
 * @param store_id 가게 고유 아이디
 */
export const fetchCategoriesWithMenuItemByStoreId = async (store_id: string) => {
  const { data, error } = await supabase
    .from('menu_category')
    .select('*, menu_item(*, menu_option(*, menu_option_detail(*))), store(business_name, use_table)')
    .eq('store_id', store_id)
    .order('position', { ascending: true })
    .returns<CategoryWithMenuItem[]>();
  if (error) {
    return { data: [], error };
  }

  // 각 카테고리의 menu_item을 position 값에 따라 정렬
  const dataWithSortedMenuItems = data.map(category => ({
    ...category,
    menu_item: category.menu_item.sort((a, b) => a.position - b.position),
  }));

  return { data: dataWithSortedMenuItems, error };
};
