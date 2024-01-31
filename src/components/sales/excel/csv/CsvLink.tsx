import { useDataHandler } from '@/hooks/sales/useDataHandler';
import useToast from '@/hooks/service/ui/useToast';
import { EnOrderType, ExcelData } from '@/types/sales';
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

const TAKE_OUT_HEADER = [
  { label: '포장', key: 'order_type' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];
/**
 * 토스트 알람에 쓰일 enum
 */

const STORE_FILE_NAME = '매장매출내역.csv';
const TAKE_OUT_FILE_NAME = '포장매출내역.csv';
const NOT_DATA = '데이터가 없습니다.';
const CsvLink = ({ order_type, children }: { order_type: EnOrderType; children: string }) => {
  const { clickGetAllDataHandler } = useDataHandler();
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const { toast } = useToast();
  const csvLink = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const clickDownloadExcelData = async () => {
    const excelDataList = await clickGetAllDataHandler(order_type);
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
      <button onClick={clickDownloadExcelData}>{children}</button>
      <CSVLink
        headers={order_type === 'store' ? STORE_HEADER : TAKE_OUT_HEADER}
        data={excelData}
        filename={order_type === 'store' ? STORE_FILE_NAME : TAKE_OUT_FILE_NAME}
        target="_blank"
        ref={csvLink}
      />
    </div>
  );
};

export default CsvLink;
