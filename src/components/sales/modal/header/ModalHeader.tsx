import styles from './styles/modalHeader.module.css';
import CloseButton from '/public/icons/close.svg';
const ModalHeader = () => {
  return (
    <div className={styles.container}>
      <p>매출상세</p>
      <button className={styles.closeButton}>
        <CloseButton width={26} height={26} />
      </button>
    </div>
  );
};

export default ModalHeader;
