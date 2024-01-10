import { supabase } from '@/shared/supabase';
import { Tables } from '@/types/supabase';

export const addSales = async (sales: Omit<Tables<'sales'>, 'id'>[]) => {
  const { error } = await supabase
    .from('sales')
    .insert(
      sales.map(sale => ({
        store_id: sale.store_id,
        sales_date: sale.sales_date,
        product_name: sale.product_name,
        product_ea: sale.product_ea,
        product_category: sale.product_category,
        product_price: sale.product_price,
      })),
    )
    .select();

  if (error) console.error(error);
};
