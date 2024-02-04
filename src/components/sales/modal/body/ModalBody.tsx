import Button from '@/components/common/Button';
import useSalesModal, { setSalesModalType } from '@/shared/store/sales/salesModal';
import { CalendarDataType } from '@/types/sales';
import clsx from 'clsx';
import ModalContents from './content/ModalContents';
import styles from './styles/modalBody.module.css';

interface Info {
  sales: CalendarDataType;
}

const ModalBody = ({ sales }: Info) => {
  const modalType = useSalesModal(state => state.modalType);
  const clickChangeModalType = (param: boolean) => setSalesModalType(param);
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <p className={styles.titleText}>{sales.date}</p>
        <div className={styles.buttonGroup}>
          <Button
            type="button"
            className={clsx(styles.button, {
              [styles.buttonActive]: modalType === true,
            })}
            onClick={() => clickChangeModalType(true)}
          >
            매장
          </Button>
          <Button
            type="button"
            className={clsx(styles.button, {
              [styles.buttonActive]: modalType === false,
            })}
            onClick={() => clickChangeModalType(false)}
          >
            포장
          </Button>
        </div>
      </div>
      <div className={styles.body}>
        <ModalContents
          {...(modalType && { store: sales.store })}
          {...(!modalType && { toGo: sales.to_go })}
          type={modalType}
        />
      </div>
    </div>
  );
};

export default ModalBody;
