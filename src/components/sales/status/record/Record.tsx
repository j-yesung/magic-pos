import useManagementState from '@/shared/store/management';
import styles from './styles/Record.module.css';
const Record = () => {
  const { sales } = useManagementState();

  return <div className={styles['container']}></div>;
};

export default Record;
