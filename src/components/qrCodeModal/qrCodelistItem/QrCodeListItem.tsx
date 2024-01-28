import useQRCodeDownLoad from '@/hooks/qrCode/useQRCodeDownLoad';
import useManagementStore from '@/shared/store/management';
import { StoreWithOrderInfo, Tables } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import { IoPrintOutline } from 'react-icons/io5';
import styles from './styles/QrCodeListitem.module.css';

interface propsType {
  storeTable?: Tables<'store_table'>;
  orderType: string;
}

const QrCodeListItem = ({ storeTable, orderType }: propsType) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<StoreWithOrderInfo[]>(['management']);
  const storeId = data && data[0].id;
  const tableCount = data && data[0].store_table;
  const [isQrClick, setIsQrClick] = useState(false);
  const QRImage = useRef<HTMLDivElement[]>([]);
  const qrUrl = storeTable
    ? `${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/kiosk/${storeId}?tableId=${storeTable.id}`
    : `${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/kiosk/${storeId}`;
  const { setQrData, qrData } = useManagementStore();
  const { oneMutate } = useQRCodeDownLoad();
  const clickQrDownLoadHandler = () => {
    setIsQrClick(true);
  };
  useEffect(() => {
    if (tableCount) {
      if (QRImage && qrUrl && storeId && tableCount.length + 1 > qrData.length) {
        setQrData({
          qrRef: QRImage.current[0],
          qrUrl,
          orderType,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [QRImage, qrUrl, storeId]);
  useEffect(() => {
    if (isQrClick) {
      oneMutate({
        qrRef: QRImage.current[0],
        orderType,
      });
    }
    setIsQrClick(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQrClick]);

  return (
    <div
      className={styles['qr-code-svg-box']}
      ref={el => (QRImage.current[0] = el as HTMLDivElement)}
      onClick={clickQrDownLoadHandler}
    >
      <div className={clsx(styles['qr-code'], isQrClick && styles['active'], !storeTable && styles['order-type-togo'])}>
        {storeTable && <div className={styles['table-number']}>{storeTable.position}번 테이블</div>}
        <div className={clsx(styles['qr-print-icon'], !storeTable && styles['order-type-togo'])}>
          <IoPrintOutline />
          <span>출력하기</span>
        </div>
        <QRCodeSVG value={qrUrl ?? ''} width={'12.5rem'} height={'12.5rem'} />
      </div>
    </div>
  );
};

export default QrCodeListItem;
