import styles from '../styles/confirmModal.module.css';
import Alert from '/public/icons/alert-circle.svg';
const Body = () => {
  return (
    <div className={styles.body}>
      <div>
        <Alert />
      </div>
      <div>
        <p className={styles.bodyText}>플랫폼을 삭제할까요?</p>
      </div>
    </div>
  );
};

export default Body;
