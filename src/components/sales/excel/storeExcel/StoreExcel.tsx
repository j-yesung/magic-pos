import { useDataHandler } from '@/hooks/sales/useDataHandler';
import useToast from '@/hooks/service/ui/useToast';
import { ExcelData } from '@/types/sales';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';

const STORE_HEADER = [
  { label: '매장', key: 'order_type' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];

const NOT_DATA = '데이터가 없습니다.';
const StoreExcel = () => {
  const { clickGetAllDataHandler } = useDataHandler();
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const { toast } = useToast();
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const clickDownloadExcelData = async () => {
    const excelDataList = await clickGetAllDataHandler('store');
    if (excelDataList.length === 0)
      return toast(NOT_DATA, {
        type: 'info',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });

    setExcelData(excelDataList);
  };
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
      <button onClick={clickDownloadExcelData}>매장 다운로드</button>
      <CSVLink headers={STORE_HEADER} data={excelData} filename="매장매출내역.csv" target="_blank" ref={csvLink} />
    </div>
  );
};

export default StoreExcel;
