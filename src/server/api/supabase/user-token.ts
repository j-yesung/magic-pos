import { TablesInsert } from '@/types/supabase';
import { supabase } from '@/shared/supabase';


/**
 * 주문별 토큰 값 조회
 * @param orderId 주문 아이디
 * @returns 주문별 토큰 값
 */
export const getUserToken = async (orderId: string) => {
  const { data: token, error } = await supabase.from('user_token').select('*').eq('order_id', orderId);
  if (error) throw error;
  return token;

  
export const addUserToken = async (data: TablesInsert<'user_tokens'>) => {
  const { error } = await supabase.from('user_tokens').insert(data);
  console.error(error);
  if (error) throw new Error(error.message);
};
