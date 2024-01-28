import Button from '@/components/common/Button';
import { IsTakeOutType } from '@/types/sales';
import clsx from 'clsx';
import styles from './styles/modalBody.module.css';

interface Info {
  store: IsTakeOutType[] | null;
  toGo: IsTakeOutType[] | null;
}

const ModalBody = ({ store, toGo }: Info) => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleText}>날짜</p>
        <div className={styles.buttonGroup}>
          <Button type="button" className={styles.button}>
            매장
          </Button>
          <Button
            type="button"
            className={clsx(styles.button, {
              [styles.buttonActive]: true,
            })}
          >
            포장
          </Button>
        </div>
      </div>
      <div className={styles.body}></div>
    </div>
  );
};

export default ModalBody;
