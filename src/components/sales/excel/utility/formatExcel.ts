import { ExcelData, KoOrderType } from '@/types/sales';
import { Tables } from '@/types/supabase';
import dayjs from 'dayjs';

/**
 *
 * @param allSales
 * @param order_type '매장' | '포장'
 * @returns
 */
export const formattedDatabyExcel = (allSales: Tables<'sales'>[], order_type: KoOrderType) => {
  if (allSales.length === 0) return [];

  const formattedExcelData = allSales.map(sale => {
    const productCatalog = {} as ExcelData;
    productCatalog.order_type = order_type;
    productCatalog.sales_date = dayjs(sale.sales_date).format('YYYY년 MM월 DD일 HH시 mm분');
    productCatalog.product_name = sale.product_name!;
    productCatalog.product_price = sale.product_price;
    productCatalog.product_ea = sale.product_ea;
    productCatalog.sum = sale.product_ea * sale.product_price;
    return productCatalog;
  });

  return formattedExcelData;
};
