import { QRdataType } from '@/shared/store/management';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

export const QRDownload = async (qrData: QRdataType[]) => {
  if (qrData) {
    const qrDowndLoadDataList = qrData.map((qrcode)=>
      html2canvas(qrcode.qrRef, { scale: 2 })
      .then((img)=>{
        img.toBlob(blob => {
          if (blob !== null) {
            saveAs(blob, `${qrcode.orderType}.jpg`);
          }
        })
      })
    )
    try {
        await Promise.all(qrDowndLoadDataList)
    } catch (error) {
      console.error(error);
    }
  }
};