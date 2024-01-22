import useQRCodeDownLoad from '@/hooks/management/useQRCodeDownLoad';
import { useModal } from '@/hooks/modal/useModal';
import useManagementStore from '@/shared/store/management';
import { useState } from 'react';
import PackagingQrCodeContainer from './packagingQrCodeContainer/PackagingQrCodeContainer';
import ShopQrCodeContainer from './shopQrCodeContainer/ShopQrCodeContainer';
import styles from './styles/QrCodeModal.module.css';
import CloseButton from '/public/icons/x.svg';

type QrCodeModalProps = 'shop' | 'packaging' | null;

const QrCodeModal = ({ modalId }: { modalId?: string }) => {
  const { qrData } = useManagementStore();
  const qrDownLoad: ReturnType<typeof useQRCodeDownLoad> = useQRCodeDownLoad();
  const { MagicModal } = useModal();
  const [selectedComponent, setSelectedComponent] = useState<QrCodeModalProps>(null);

  const clickComponentHandler = (component: 'shop' | 'packaging') => {
    if (component === selectedComponent) return;
    setSelectedComponent(prevComponent => (prevComponent === component ? null : component));
  };

  const clickQrDownLoadHandler = () => {
    qrData.forEach(item => {
      qrDownLoad(item);
    });
  };
  const clickModalCloseHandler = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <>
      <div className={styles.qrCodeModalBox}>
        <div className={styles.qrTitleContainer}>
          <div className={styles.qrCodeTitle}>QR코드 출력하기</div>
          <CloseButton width={20} height={20} />
        </div>
        <div className={styles.qrCodeBox}>
          <div
            className={selectedComponent === 'shop' ? `${styles.qrCodeMoveButton} ${styles.active}` : styles.notActive}
            onClick={() => clickComponentHandler('shop')}
          >
            매장용 QR코드
          </div>
          <div
            className={
              selectedComponent === 'packaging' ? `${styles.qrCodeMoveButton} ${styles.active}` : styles.notActive
            }
            onClick={() => clickComponentHandler('packaging')}
          >
            포장용 QR코드
          </div>
        </div>
        <div className={styles.qrCodeShowBox}>
          {selectedComponent === 'shop' && <ShopQrCodeContainer />}
          {selectedComponent === 'packaging' && <PackagingQrCodeContainer />}
        </div>
        <div className={styles.qrCodeButtonBox}>
          <button onClick={clickQrDownLoadHandler}>전체 다운로드</button>
          <button onClick={clickModalCloseHandler}>닫기</button>
        </div>
      </div>
    </>
  );
};

export default QrCodeModal;
