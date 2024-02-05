import { QRdataType } from '@/shared/store/qrCode';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

export const QRDownloadAll = async (qrData: QRdataType[]) => {
  if (qrData) {
    try {
      const zip = new JSZip();
      const qrCodeImg = qrData.map(async qrCode => {
        const file = await domtoimage.toBlob(qrCode.qrRef);
        return zip.file(`${qrCode.orderType}.jpg`, file);
      });
      await Promise.all(qrCodeImg).then(() => {
        zip.generateAsync({ type: 'blob' }).then(content => {
          saveAs(content, 'QRCode');
        });
      });
    } catch (error) {
      console.error(error);
    }
  }
};

export const QRDownload = async (qrData: QRdataType) => {
  if (qrData) {
    try {
      const file = await domtoimage.toBlob(qrData.qrRef);
      saveAs(file, `${qrData.orderType}.jpg`);
    } catch (error) {
      console.error(error);
    }
  }
};
