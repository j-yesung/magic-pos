import { useModal } from '@/hooks/modal/useModal';
import useSetTable from '@/hooks/table/useSetTable';
import useTableStore from '@/shared/store/table';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import { FiAlertCircle } from 'react-icons/fi';
import TableEditModal from './TableEditModal/TableEditModal';
import styles from './styles/TableListItem.module.css';
import CloseButton from '/public/icons/close.svg';
import EditButton from '/public/icons/pencil.svg';

const TableListItem = ({ storeTableData, index }: { storeTableData: Tables<'store_table'>; index: number }) => {
  const { deleteMutate } = useSetTable();
  const { TableItemClick } = useTableStore();
  const { MagicModal } = useModal();

  const clickOpenEditModalHandler = () => {
    TableItemClick({
      tableId: storeTableData.id,
      tableNumber: storeTableData.position,
      maxGuest: storeTableData.max_guest,
      isDisabled: storeTableData.is_disabled,
    });
    MagicModal.fire(<TableEditModal />);
  };

  const clickDeleteTableHandler = () => {
    MagicModal.confirm({
      icon: <FiAlertCircle size={50} />,
      content: '정말로 삭제하시겠습니까?',
      confirmButtonCallback: () => {
        deleteMutate(storeTableData.id);
      },
    });
  };
  return (
    <div className={clsx(styles['table-list-item'], index % 6 === 5 && styles['item-row-5'])}>
      <div className={styles['close-button']} onClick={clickDeleteTableHandler}>
        <CloseButton className={styles['close-button-svg']} width={23} height={23} />
      </div>
      <div className={styles['table-number']}>테이블 {storeTableData.position}</div>
      <div className={styles['edit-button']} onClick={clickOpenEditModalHandler}>
        <EditButton className={styles['edit-button-svg']} width={50} height={50} />
      </div>
    </div>
  );
};

export default TableListItem;
