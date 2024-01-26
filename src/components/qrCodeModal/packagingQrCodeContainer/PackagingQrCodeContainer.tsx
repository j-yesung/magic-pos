import QrCodeListItem from '../qrCodelistItem/QrCodeListItem';
import styles from './styles/PackagingQrCodeContainer.module.css';

const PackagingQrCodeContainer = () => {
  return (
    <div className={styles['packaging-qr-code-container']}>
      {/* <div className={styles['packaging-qr-code-title']}>포장용 QR코드</div> */}
      <div className={styles['packaging-qr-code-item-box']}>
        <QrCodeListItem orderType="packaging" />
      </div>
    </div>
  );
};

export default PackagingQrCodeContainer;
