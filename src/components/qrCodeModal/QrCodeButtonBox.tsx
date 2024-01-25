import useQRCodeDownLoad from '@/hooks/management/useQRCodeDownLoad';
import { useModal } from '@/hooks/service/ui/useModal';
import useManagementStore from '@/shared/store/management';
import styles from './styles/QrCodeModal.module.css';

const QrCodeButtonBox = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { qrData } = useManagementStore();
  const qrDownLoad: ReturnType<typeof useQRCodeDownLoad> = useQRCodeDownLoad();

  const clickQrDownLoadHandler = () => {
    qrData.forEach(item => {
      qrDownLoad(item);
    });
  };
  const clickModalCloseHandler = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles.qrCodeButtonBox}>
      <button onClick={clickQrDownLoadHandler}>전체 다운로드</button>
      <button onClick={clickModalCloseHandler}>닫기</button>
    </div>
  );
};
export default QrCodeButtonBox;
