import useQRCodeDownLoad from '@/hooks/qrCode/useQRCodeDownLoad';
import useManagementStore from '@/shared/store/management';
import Image from 'next/image';
import { useEffect } from 'react';
import Button from '../common/Button';
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
      <Button type="button" className={isPending ? styles.qrButton : ''} onClick={clickQrDownLoadHandler}>
        {isPending ? (
          <Image src={'https://high.gwnu.ac.kr/contents/images/boxloading.gif'} alt="" width={32} height={32} />
        ) : (
          <span>전체 다운로드</span>
        )}
      </Button>
    </div>
  );
};
export default QrCodeButtonBox;
