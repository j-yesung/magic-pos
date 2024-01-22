import { QRdataType } from '@/shared/store/management';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const useQRCodeDownLoad = () => {
  const QRDownload = async ({ qrRef, orderType }: QRdataType) => {
    if (qrRef) {
      try {
        const canvas = await html2canvas(qrRef, { scale: 2 });
        canvas.toBlob(blob => {
          if (blob !== null) {
            saveAs(blob, `${orderType}.jpg`);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return QRDownload;
};

export default useQRCodeDownLoad;
