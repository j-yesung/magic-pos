import useQRCodeDownLoad from '@/hooks/qrCode/useQRCodeDownLoad';
import useManagementStore from '@/shared/store/management';
import Image from 'next/image';
import Button from '../common/Button';
import styles from './styles/QrCodeModal.module.css';
import loading from '/public/images/loadingSpinner.gif';

const QrCodeButtonBox = () => {
  const { qrData } = useManagementStore();
  const { AllMutate, AllIsPending } = useQRCodeDownLoad();
  const clickQrDownLoadHandler = () => {
    AllMutate(qrData);
  };

  return (
    <div className={styles.qrCodeButtonBox}>
      <Button type="button" className={AllIsPending ? styles.qrButton : ''} onClick={clickQrDownLoadHandler}>
        {AllIsPending ? <Image src={loading} alt="" width={32} height={32} /> : <span>전체 다운로드</span>}
      </Button>
    </div>
  );
};
export default QrCodeButtonBox;
