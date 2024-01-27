import { QRdataType } from '@/shared/store/management';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

  export const QRDownload = async (qrData: QRdataType[]) => {
    if (qrData) {
      try {
        const zip = new JSZip(); 
        const qrCodeImg = qrData.map(async(qrcode)=> {
          const file = await domtoimage.toBlob(qrcode.qrRef)
          return zip.file(`${qrcode.orderType}.jpg`, file)
        })
        await Promise.all(qrCodeImg).then(()=>{
          zip.generateAsync({type: 'blob'}).then((content)=>{
            saveAs(content, 'QRCode');
          })
        })
      } catch (error) {
        console.error(error);
      }
    }
  };