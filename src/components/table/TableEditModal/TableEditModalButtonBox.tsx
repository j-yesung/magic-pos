import Button from '@/components/common/Button';
import useClickCUDHandler from '@/hooks/table/useClickCUDHandler';
import styles from './styles/TableEditModalButtonBox.module.css';

const TableEditModalButtonBox = ({ modalId }: { modalId: string }) => {
  const { clickUpdateTableHandler, clickCloseModalHandler } = useClickCUDHandler();

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
        확인
      </Button>
    </div>
  );
};

export default TableEditModalButtonBox;
