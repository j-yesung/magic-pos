import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import useClickCUDHandler from '@/hooks/service/table/useClickCUDHandler';
import { useEffect, useRef } from 'react';
import styles from './styles/TableEditModalButtonBox.module.css';

const TableEditModalButtonBox = ({ modalId }: { modalId: string }) => {
  const { clickUpdateTableHandler, clickCloseModalHandler, updateIsPending } = useClickCUDHandler();
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      if (!updateIsPending) {
        clickCloseModalHandler(modalId);
      }
    } else {
      didMount.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateIsPending]);

  return (
    <div className={styles['modal-button-box']}>
      <Button
        type="button"
        className={styles.closeButton}
        onClick={() => {
          clickCloseModalHandler(modalId);
        }}
      >
        취소
      </Button>
      <Button type="button" className={styles.editButton} onClick={clickUpdateTableHandler}>
        {updateIsPending ? <LoadingSpinner boxSize={2} ballSize={0.3} /> : '확인'}
      </Button>
    </div>
  );
};

export default TableEditModalButtonBox;
