import { ExcelData } from '@/types/sales';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
const headers = [
  { label: '매장', key: 'order_type' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];

const data = [
  { order_type: 'asdf', product_name: '순댓국', product_price: 12, product_ea: 4, sum: 48, sales_date: dayjs() },
  { order_type: 'asdf', product_name: '순댓국', product_price: 12, product_ea: 4, sum: 48, sales_date: dayjs() },
  { order_type: 'asdf', product_name: '순댓국', product_price: 12, product_ea: 4, sum: 48, sales_date: dayjs() },
];
const StoreExcel = ({ today, storeId }: { today: Dayjs; storeId: string }) => {
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);

  useEffect(() => {
    if (excelData.length !== 0) {
      csvLink.current?.link.click();
    }
  }, [excelData]);

  useEffect(() => {
    return setExcelData([]);
  }, []);
  return (
    <div>
      <button>매장 다운로드</button>
      <CSVLink headers={headers} data={data} filename="매장매출내역.csv" target="_blank" ref={csvLink} />
    </div>
  );
};

export default StoreExcel;
