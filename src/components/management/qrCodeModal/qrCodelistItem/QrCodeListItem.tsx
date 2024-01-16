import useQRCodeDownLoad from '@/hooks/management/useQRCodeDownLoad';
import { StoreWithOrderInfo, Tables } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useRef, useState } from 'react';
import styles from './styles/QrCodeListitem.module.css';

const QrCodeListItem = ({ storeTable, orderType }: { storeTable?: Tables<'store_table'>, orderType: string }) => {

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<StoreWithOrderInfo[]>(['management'])
  const storeId = data && data[0].id
  const [isQrClick, setIsQrClick] = useState(false)
  const QRImage = useRef<HTMLDivElement>(null);
  const qrUrl = storeTable
    ? `${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/${storeId}/${storeTable.id}`
    : `${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}/${storeId}`

  const qrDownLoad = useQRCodeDownLoad(QRImage, qrUrl, orderType);
  const clickQrDownLoadHandler = () => {
    setIsQrClick(true)
  }

  useEffect(() => {
    if (isQrClick) {
      qrDownLoad();
    }
    setIsQrClick(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isQrClick])


  return (
    <div className={styles['qr-code-svg-box']} ref={QRImage} onClick={clickQrDownLoadHandler}>
      <div className={clsx(styles['qr-code'],
        isQrClick && styles['active'], !storeTable && styles['order-type-togo'])} >
        {storeTable && <div className={styles['table-number']}>{storeTable.position}번 테이블</div>}
        <QRCodeSVG value={qrUrl ?? ''} />
      </div>
    </div>
  )
}

export default QrCodeListItem