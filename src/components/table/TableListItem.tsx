import useClickCUDHandler from '@/hooks/service/table/useClickCUDHandler';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import TableEditModal from './TableEditModal/TableEditModal';
import styles from './styles/TableListItem.module.css';
import CloseButton from '/public/icons/close.svg';
import ExclamationMark from '/public/icons/exclamation-mark.svg';
import EditButton from '/public/icons/pencil.svg';

const TableListItem = ({ storeTableData }: { storeTableData: Tables<'store_table'> }) => {
  const { clickDeleteTableHandler, clickOpenEditModalHandler } = useClickCUDHandler();
  const tableItemData = {
    tableId: storeTableData.id,
    tableNumber: storeTableData.position,
    maxGuest: storeTableData.max_guest,
    isDisabled: storeTableData.is_disabled,
  };

  return (
    <div className={clsx(styles['table-list-item'])}>
      <div
        className={styles['close-button']}
        onClick={() => {
          clickDeleteTableHandler(storeTableData.id, <ExclamationMark width={50} height={50} />);
        }}
      >
        <CloseButton className={styles['close-button-svg']} width={23} height={23} />
      </div>
      <div className={styles['table-number']}>테이블 {storeTableData.position}</div>
      <div
        className={styles['edit-button']}
        onClick={() => {
          clickOpenEditModalHandler(tableItemData, <TableEditModal />);
        }}
      >
        <EditButton className={styles['edit-button-svg']} width={50} height={50} />
      </div>
    </div>
  );
};

export default TableListItem;
