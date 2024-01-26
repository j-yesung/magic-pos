import { TablesInsert } from '@/types/supabase';
import { supabase } from '@/shared/supabase';

export const addUserToken = async (data: TablesInsert<'user_tokens'>) => {
  const { error } = await supabase.from('user_tokens').insert(data);
  console.error(error);
  if (error) throw new Error(error.message);
};
