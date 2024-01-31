import dayjs, { Dayjs } from 'dayjs';
import { CSVLink } from 'react-csv';
const headers = [
  { label: '매장', key: 'store' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];

const data = [
  { store: '매장', product_name: '순댓국', prodcut_price: 12, product_ea: 4, sum: 48, sales_date: dayjs() },
  { store: '매장', product_name: '순댓국', prodcut_price: 12, product_ea: 4, sum: 48, sales_date: dayjs() },
  { store: '매장', product_name: '순댓국', prodcut_price: 12, product_ea: 4, sum: 48, sales_date: dayjs() },
];
const TakeOutExcel = ({ today, storeId }: { today: Dayjs; storeId: string }) => {
  return (
    <div>
      <button>매장 다운로드</button>
      <CSVLink headers={headers} data={data} filename="test.xls" target="_blank" />
    </div>
  );
};

export default TakeOutExcel;
