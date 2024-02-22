import useQRDownLoadHandler from '@/hooks/service/qr-code/useQRDownLoadHandler';
import useQRCodeStore from '@/shared/store/qrCode';
import Image from 'next/image';
import Button from '../common/Button';
import styles from './styles/QrCodeModal.module.css';
import loading from '/public/images/loadingSpinner.gif';

const QrCodeButtonBox = () => {
  const { qrData } = useQRCodeStore();
  const { clickAllQrDownLoadHandler, AllIsPending } = useQRDownLoadHandler();

  return (
    <div className={styles.qrCodeButtonBox}>
      <Button
        type="button"
        className={AllIsPending ? styles.qrButton : ''}
        onClick={() => {
          clickAllQrDownLoadHandler(qrData);
        }}
      >
        {AllIsPending ? <Image src={loading} alt="" width={32} height={32} /> : <span>전체 다운로드</span>}
      </Button>
    </div>
  );
};
export default QrCodeButtonBox;
