import { supabase } from "@/shared/supabase";


export const fetchOrderCheckList = async (id?: string) => {
  if (id) {
    const { data: store, error } = await supabase.from('store')
      .select('*,order_store(*),order_number(*)')
      .eq('business_id', id)
    if (error) throw new Error(error.message);
    return store;
  }
};