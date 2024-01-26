import styles from './styles/QrCodeModal.module.css';

interface propsType {
  selectedComponent: 'shop' | 'packaging' | null;
  clickComponentHandler: (component: 'shop' | 'packaging') => void;
}

const QrCodeTabButton = ({ selectedComponent, clickComponentHandler }: propsType) => {
  return (
    <div className={styles.qrCodeBox}>
      <div
        className={selectedComponent === 'shop' ? `${styles.qrCodeMoveButton} ${styles.active}` : styles.notActive}
        onClick={() => clickComponentHandler('shop')}
      >
        매장용 QR코드
      </div>
      <div
        className={selectedComponent === 'packaging' ? `${styles.qrCodeMoveButton} ${styles.active}` : styles.notActive}
        onClick={() => clickComponentHandler('packaging')}
      >
        포장용 QR코드
      </div>
    </div>
  );
};

export default QrCodeTabButton;
