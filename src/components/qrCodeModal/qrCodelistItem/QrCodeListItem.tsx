import { QUERY_KEY } from '@/hooks/query/qr-code/useFetchTableInQRCode';
import useQRDownLoadHandler from '@/hooks/service/qr-code/useQRDownLoadHandler';
import useQRCodeStore from '@/shared/store/qrCode';
import useAuthState from '@/shared/store/session';
import { StoreTableInQRCode, Tables } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef } from 'react';
import { IoPrintOutline } from 'react-icons/io5';
import styles from './styles/QrCodeListitem.module.css';

interface propsType {
  storeTable?: Tables<'store_table'>;
  orderType: string;
}

const QrCodeListItem = ({ storeTable, orderType }: propsType) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<StoreTableInQRCode[]>([QUERY_KEY.QR_CODE]);
  const { storeId } = useAuthState();
  const tableCount = data && data[0].store_table.length;
  const { clickOneQrDownLoadHandler, isQrClick } = useQRDownLoadHandler();
  const QRImage = useRef<HTMLDivElement[]>([]);
  const { setQrData, qrData } = useQRCodeStore();
  // qr code url
  const qrUrl = storeTable
    ? `${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/kiosk/${storeId}?tableId=${storeTable.id}`
    : `${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/kiosk/${storeId}`;
  console.log(qrData);
  useEffect(() => {
    setQrData({
      qrRef: QRImage.current[0],
      orderType,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={styles['qr-code-svg-box']}
      ref={el => (QRImage.current[0] = el as HTMLDivElement)}
      onClick={() => {
        clickOneQrDownLoadHandler(QRImage.current[0], orderType);
      }}
    >
      <div className={clsx(styles['qr-code'], isQrClick && styles['active'], !storeTable && styles['order-type-togo'])}>
        {storeTable && <div className={styles['table-number']}>{storeTable.position}번 테이블</div>}
        <div
          className={clsx(
            styles['qr-print-icon'],
            !storeTable && styles['order-type-togo'],
            isQrClick && styles['active'],
          )}
        >
          <IoPrintOutline />
          <span>출력하기</span>
        </div>
        <QRCodeSVG value={qrUrl ?? ''} width={'12.5rem'} height={'12.5rem'} />
      </div>
    </div>
  );
};

export default QrCodeListItem;
