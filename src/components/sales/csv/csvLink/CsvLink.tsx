import { NOT_DATA, STORE_FILE_NAME, STORE_HEADER, TAKE_OUT_FILE_NAME, TAKE_OUT_HEADER } from '@/data/csv';
import { useDataHandler } from '@/hooks/service/sales/useDataHandler';
import useToast from '@/hooks/service/ui/useToast';
import { EnOrderType, ExcelData } from '@/types/sales';
import { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import styles from './styles/csvLink.module.css';

interface CsvLinkPropsType {
  order_type: EnOrderType;
  children: string;
  clickHiddenModal: () => void;
}

const CsvLink = ({ order_type, children, clickHiddenModal }: CsvLinkPropsType) => {
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
      clickHiddenModal();
    }
  }, [excelData]);

  useEffect(() => {
    return setExcelData([]);
  }, []);
  return (
    <div className={styles.container}>
      <button type="button" onClick={clickDownloadExcelData} className={styles.csvButton}>
        {children}
      </button>
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
