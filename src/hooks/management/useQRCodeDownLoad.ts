import { saveAs } from 'file-saver';
import html2canvas from "html2canvas";

const useQRCodeDownLoad = (QRImage: { current: HTMLDivElement | null }, qrUrl: string, orderType: string) => {

  const QRDownload = async () => {
    if (!QRImage.current || qrUrl) {
      try {
        const qrImgBox = QRImage.current;
        const canvas = await html2canvas(qrImgBox, { scale: 2 });
        canvas.toBlob((blob) => {
          if (blob !== null) {
            saveAs(blob, `${orderType}.jpg`);
          }
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
  return QRDownload;
}

export default useQRCodeDownLoad