import useQRCodeDownLoad from '@/hooks/management/useQRCodeDownLoad';
import { useModal } from '@/hooks/modal/useModal';
import useManagementStore from '@/shared/store/management';
import PackagingQrCodeContainer from './packagingQrCodeContainer/PackagingQrCodeContainer';
import ShopQrCodeContainer from './shopQrCodeContainer/ShopQrCodeContainer';
import styles from './styles/QrCodeModal.module.css';

const QrCodeModal = ({ modalId }: { modalId?: string }) => {
  const { qrData } = useManagementStore();
  const qrDownLoad = useQRCodeDownLoad();
  const { MagicModal } = useModal();
  const clickQrDownLoadHandler = () => {
    qrData.forEach(item => {
      qrDownLoad(item);
    });
  };
  const clickModalCloseHandler = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['qr-code-modal-box']}>
      <div className={styles['qr-code-title']}>QR코드 출력하기</div>
      <div className={styles['qr-code-box']}>
        <PackagingQrCodeContainer />
        <ShopQrCodeContainer />
      </div>
      <div className={styles['qr-code-button-box']}>
        <button onClick={clickQrDownLoadHandler}>QR코드 다운로드</button>
        <button onClick={clickModalCloseHandler}>닫기</button>
      </div>
    </div>
  );
};

export default QrCodeModal;
