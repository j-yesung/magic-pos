import { supabase } from '@/shared/supabase';

export const fetchStoreTable = async () => {
  const { data: store, error } = await supabase.from('store').select('*');
  if (error) throw new Error(error.message);
  console.log(store);
  return store;
};
