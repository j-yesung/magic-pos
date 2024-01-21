import useQRCodeDownLoad from '@/hooks/management/useQRCodeDownLoad';
import { useModal } from '@/hooks/modal/useModal';
import useManagementStore from '@/shared/store/management';
import PackagingQrCodeContainer from './packagingQrCodeContainer/PackagingQrCodeContainer';
import ShopQrCodeContainer from './shopQrCodeContainer/ShopQrCodeContainer';
import styles from './styles/QrCodeModal.module.css';
import CloseButton from '/public/icons/x.svg';

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
    <div className={styles.qrCodeModalBox}>
      <div className={styles.qrTitleContainer}>
        <div className={styles.qrCodeTitle}>QR코드 출력하기</div>
        <CloseButton width={20} height={20} />
      </div>
      <div className={styles.qrCodeBox}>
        <ShopQrCodeContainer />
        <PackagingQrCodeContainer />
      </div>
      <div className={styles.qrCodeButtonBox}>
        <button onClick={clickQrDownLoadHandler}>QR코드 다운로드</button>
        <button onClick={clickModalCloseHandler}>닫기</button>
      </div>
    </div>
  );
};

export default QrCodeModal;
