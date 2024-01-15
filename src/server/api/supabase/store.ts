import { supabase } from '@/shared/supabase';

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
export const getStoreBnoNumber = async (userId: string) => {
  const { data, error } = await supabase.from('store').select('business_number').eq('business_id', userId);
  return { store: data, error };
};
