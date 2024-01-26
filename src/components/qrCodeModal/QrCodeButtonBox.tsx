import useQRCodeDownLoad from '@/hooks/qrCode/useQRCodeDownLoad';
import useManagementStore from '@/shared/store/management';
import { useEffect } from 'react';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';
import styles from './styles/QrCodeModal.module.css';

const QrCodeButtonBox = ({ modalId }: { modalId?: string }) => {
  const { qrData } = useManagementStore();
  const { mutate, isPending } = useQRCodeDownLoad();
  const clickQrDownLoadHandler = () => {
    mutate(qrData);
  };
  useEffect(() => {
    console.log(isPending);
  }, [isPending]);

  return (
    <div className={styles.qrCodeButtonBox}>
      <Button type="button" onClick={clickQrDownLoadHandler}>
        {!isPending ? (
          <LoadingSpinner boxSize={1.6} ballSize={0.3} interval={1.4} />
        ) : (
          // <Image
          //   src={
          //     'https://mblogthumb-phinf.pstatic.net/MjAxODEwMjNfNjAg/MDAxNTQwMjg2OTk2NTcw.mfWKPtzKVO1mJaBBIFKIkVBlMQQIF1Vc-yrlbbGaoP0g.KNJWAgMmhsfQrZI3n0UT-LMi_qpHAZls4qPMvbNaJBcg.GIF.chingguhl/Spinner-1s-200px.gif?type=w800'
          //   }
          //   alt=""
          //   width={40}
          //   height={40}
          // />
          <span>전체 다운로드</span>
        )}
      </Button>
    </div>
  );
};
export default QrCodeButtonBox;
