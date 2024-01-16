import { saveAs } from 'file-saver';
import html2canvas from "html2canvas";

const useQRCodeDownLoad = (QRImage: HTMLDivElement, qrUrl: string, orderType: string) => {

  const QRDownload = async () => {
    if (!QRImage || qrUrl) {
      try {
        const canvas = await html2canvas(QRImage, { scale: 2 });
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