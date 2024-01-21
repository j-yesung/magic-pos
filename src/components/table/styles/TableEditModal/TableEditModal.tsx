import TableEditModalButtonBox from './TableEditModalButtonBox';
import TableEditModalContainer from './TableEditModalContainer';
import styles from './styles/TableEditModal.module.css';
import CloseButton from '/public/icons/close.svg';

const TableEditModal = () => {
  return (
    <div className={styles['table-edit-modal-wrapper']}>
      <div className={styles['table-edit-modal-close-wrapper']}>
        <span>테이블 수정</span>
        <CloseButton className={styles['close-button-svg']} width={26} height={26} />
      </div>
      <TableEditModalContainer />
      <TableEditModalButtonBox />
    </div>
  );
};

export default TableEditModal;
