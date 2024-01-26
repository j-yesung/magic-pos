import { supabase } from '@/shared/supabase';
import { TablesInsert } from '@/types/supabase';

/**
 * 주문별 토큰 값 조회
 * @param orderId 주문 아이디
 * @returns 주문별 토큰 값
 */
export const getUserToken = async (orderId: string) => {
  const { data, error } = await supabase.from('user_tokens').select('*').eq('order_id', orderId).single();
  if (error) throw error;
  return data;
};

export const addUserToken = async (data: TablesInsert<'user_tokens'>) => {
  const { error } = await supabase.from('user_tokens').insert(data);
  console.error(error);
  if (error) throw new Error(error.message);
};
