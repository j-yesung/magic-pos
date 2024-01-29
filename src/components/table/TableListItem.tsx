import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import useSetTable from '@/hooks/table/useSetTable';
import useTableStore from '@/shared/store/table';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import TableEditModal from './TableEditModal/TableEditModal';
import styles from './styles/TableListItem.module.css';
import CloseButton from '/public/icons/close.svg';
import ExclamationMark from '/public/icons/exclamation-mark.svg';
import EditButton from '/public/icons/pencil.svg';

const TableListItem = ({
  storeTableData,
  tableIdinOrderStore,
}: {
  storeTableData: Tables<'store_table'>;
  tableIdinOrderStore: string[];
}) => {
  const { deleteMutate } = useSetTable();
  const { TableItemClick } = useTableStore();
  const { MagicModal } = useModal();
  const { toast } = useToast();

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
    if (tableIdinOrderStore.includes(storeTableData.id)) {
      toast('주문이 있는 테이블은 삭제할 수 없습니다', {
        type: 'danger',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
    } else {
      MagicModal.confirm({
        icon: <ExclamationMark width={50} height={50} />,
        content: '정말로 삭제하시겠습니까?',
        confirmButtonCallback: () => {
          deleteMutate(storeTableData.id);
        },
      });
    }
  };
  return (
    <div className={clsx(styles['table-list-item'])}>
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
