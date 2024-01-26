import { QRdataType } from '@/shared/store/management';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';

export const QRDownload = async (qrData: QRdataType[]) => {
  if (qrData) {
    try { 
      const qrCodeImg = qrData.map(async(qrcode)=> await domtoimage.toBlob(qrcode.qrRef))
      console.log(qrCodeImg)
      Promise.all(qrCodeImg).then((res)=>{
        for (let i = 0; i < res.length; i++) {
          saveAs(res[i], `${qrData[i].orderType}.jpg`);
        }
        
      })
      // const zip = new JSZip();
      // zip.generateAsync({type:"blob"}) //압축파일 생성
      // .then((resZip) => {
      //   saveAs(resZip, "꾸생.zip"); //file-saver 라이브러리 사용
      // });
      // for (const data of qrData) {
      //   const image = await domtoimage.toBlob(data.qrRef)
      //   saveAs(image, `${data.orderType}.jpg`);
      // }
    } catch (error) {
      console.error(error);
    }
  }
};