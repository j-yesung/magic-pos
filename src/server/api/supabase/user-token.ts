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
};
