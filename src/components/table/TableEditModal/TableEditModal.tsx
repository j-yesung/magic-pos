import { useModal } from '@/hooks/service/ui/useModal';
import useTableStore from '@/shared/store/table';
import { useEffect } from 'react';
import TableEditModalButtonBox from './TableEditModalButtonBox';
import TableEditModalContainer from './TableEditModalContainer';
import styles from './styles/TableEditModal.module.css';
import CloseButton from '/public/icons/close.svg';

const TableEditModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { resetTableState } = useTableStore();

  const clickRemoveTableHandler = () => {
    MagicModal.hide(modalId ?? '');
  };
  useEffect(() => {
    return () => {
      resetTableState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles['table-edit-modal-wrapper']}>
      <div className={styles['table-edit-modal-close-wrapper']}>
        <span>테이블 수정</span>
        <span onClick={clickRemoveTableHandler}>
          <CloseButton className={styles['close-button-svg']} width={26} height={26} />
        </span>
      </div>
      <TableEditModalContainer />
      <TableEditModalButtonBox modalId={modalId!} />
    </div>
  );
};

export default TableEditModal;
