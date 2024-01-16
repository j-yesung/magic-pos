import useQRCodeDownLoad from '@/hooks/management/useQRCodeDownLoad';
import PackagingQrCodeContainer from './packagingQrCodeContainer/PackagingQrCodeContainer';
import ShopQrCodeContainer from './shopQrCodeContainer/ShopQrCodeContainer';
import styles from './styles/QrCodeModal.module.css';

const QrCodeModal = () => {

  const qrDownLoad = useQRCodeDownLoad(QRImage.current[index], qrUrl, orderType);
  const clickQrDownLoadHandler = () => {
    qrDownLoad();
  }

  return (
    <div className={styles['qr-code-modal-wrapper']}>
      <div className={styles['qr-code-modal-background']}></div>
      <div className={styles['qr-code-modal-box']}>
        <div className={styles['qr-code-title']}>QR코드 출력하기</div>
        <div className={styles['qr-code-box']}>
          <PackagingQrCodeContainer />
          <ShopQrCodeContainer />
        </div>
        <div className={styles['qr-code-button-box']}>
          <button onClick={clickQrDownLoadHandler}>QR코드 다운로드</button>
          <button>취소</button>
        </div>
      </div>
    </div>
  )
}

export default QrCodeModal