import { QRdataType } from '@/shared/store/management';
import { useEffect, useState } from 'react';
import useQRCodeDownLoad from './useQRCodeDownLoad';

const useQRDownLoadHandler = () => {
  const [isQrClick, setIsQrClick] = useState(false);
  const { oneMutate, AllMutate } = useQRCodeDownLoad();

  const clickAllQrDownLoadHandler = (qrData: QRdataType[]) => {
    AllMutate(qrData);
  };
  const clickOneQrDownLoadHandler = (QRImageRef: HTMLDivElement, orderType: string) => {
    setIsQrClick(true);
    oneMutate({
      qrRef: QRImageRef,
      orderType,
    });
  };

  useEffect(() => {
    if (isQrClick) {
      setIsQrClick(false);
    }
  }, [isQrClick]);

  return { clickAllQrDownLoadHandler, clickOneQrDownLoadHandler, isQrClick };
};

export default useQRDownLoadHandler;