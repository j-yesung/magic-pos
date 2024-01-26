import { supabase } from '@/shared/supabase';

/**
 * create or replace function increment_order_number (row_id uuid)
 * returns bigint as
 * $$
 *   update store
 *   set order_number = order_number + 1
 *   where id = row_id;
 *   select order_number from store
 *   where id = row_id
 * $$
 * language sql volatile;
 * @param storeId
 */
export const incrementOrderNumber = async (storeId: string) => {
  const { data, error } = await supabase.rpc('increment_order_number', { row_id: storeId }).single();
  return { orderNumber: data, error };
};

/**
 * store 테이블에서 business_number를 가져온다.
 * 단, 현재 로그인한 id와 business_id가 일치하는 경우만
 * @param userId 현재 접속 중인 사용자의 id
 * @returns 일치 데이터 row
 */
export const getStore = async (userId: string) => {
  const { data } = await supabase.from('store').select('*').eq('business_id', userId);
  return data;
};

/**
 * 영업 시간 지정
 * @param param 유저 id, 시작 시간, 종료 시간
 */
export const updateStoreTime = async ({ userId, startTime, endTime }: Record<string, string>) => {
  const { error } = await supabase
    .from('store')
    .update({ start_time: startTime, end_time: endTime })
    .eq('business_id', userId);
  if (error) throw error;
};

export const fetchStoreInfoById = async (storeId: string) => {
  const { data } = await supabase.from('store').select('*').eq('id', storeId).single();
  return data;
};

/**
 * 테이블 사용 여부 변경
 * @param storeId 가게 아이디
 * @param useTable 테이블 사용 여부
 */
export const updateStoreUseTable = async ({ storeId, useTable }: { storeId: string; useTable: boolean }) => {
  const { error } = await supabase.from('store').update({ use_table: useTable }).eq('id', storeId);
  if (error) throw error;
};
