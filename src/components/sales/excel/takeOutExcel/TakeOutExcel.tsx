import { useDataHandler } from '@/hooks/sales/useDataHandler';
import useToast from '@/hooks/service/ui/useToast';
import { ExcelData } from '@/types/sales';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { NOT_DATA } from '../utility/formatExcel';
const TAKE_OUT_HEADER = [
  { label: '포장', key: 'order_type' },
  { label: '상품명', key: 'product_name' },
  { label: '가격', key: 'product_price' },
  { label: '수량', key: 'product_ea' },
  { label: '총 가격', key: 'sum' },
  { label: '시간', key: 'sales_date' },
];

const TakeOutExcel = () => {
  const { clickGetAllDataHandler } = useDataHandler();
  const [excelData, setExcelData] = useState<ExcelData[]>([]);
  const { toast } = useToast();
  const csvLinkRef = useRef<CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }>(null);
  const clickDownloadExcelData = async () => {
    const excelDataList = await clickGetAllDataHandler('togo');
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
      csvLinkRef.current?.link.click();
    }
  }, [excelData]);

  useEffect(() => {
    return setExcelData([]);
  }, []);
  return (
    <div>
      <button onClick={clickDownloadExcelData}>포장 매출</button>
      <CSVLink
        headers={TAKE_OUT_HEADER}
        data={excelData}
        filename="포장매출내역.csv"
        target="_blank"
        ref={csvLinkRef}
      />
    </div>
  );
};

export default TakeOutExcel;
