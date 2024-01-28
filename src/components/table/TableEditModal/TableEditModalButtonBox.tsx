import Button from '@/components/common/Button';
import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import useSetTable from '@/hooks/table/useSetTable';
import useAuthState from '@/shared/store/session';
import useTableStore from '@/shared/store/table';
import { StoreWithStoreTable } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import styles from './styles/TableEditModalButtonBox.module.css';

const TableEditModalButtonBox = ({ modalId }: { modalId: string }) => {
  const { tableId, maxGuest, isDisabled } = useTableStore();
  const { session } = useAuthState();
  const { updateMutate } = useSetTable();
  const { MagicModal } = useModal();
  const client = useQueryClient();
  const data = client.getQueryData<StoreWithStoreTable[]>(['table', session?.user.id]);
  const storeData = data?.[0]?.store_table;
  const tableData = storeData?.filter(x => x.id === tableId);
  const { toast } = useToast();

  const updateStoreTableData = {
    id: tableId,
    is_disabled: isDisabled,
    max_guest: maxGuest,
  };

  const clickUpdateTableHandler = () => {
    if (tableData) {
      if (tableData?.[0]?.is_disabled === isDisabled && tableData?.[0]?.max_guest === maxGuest) {
        toast('수정사항이 없습니다', {
          type: 'danger',
          position: 'top-center',
          showCloseButton: false,
          autoClose: 2000,
        });
      } else {
        MagicModal.confirm({
          content: '수정하시겠습니까?',
          confirmButtonCallback: () => {
            updateMutate(updateStoreTableData);
          },
        });
      }
    }
  };

  const clickRemoveTableHandler = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['modal-button-box']}>
      <Button type="button" className={styles.closeButton} onClick={clickRemoveTableHandler}>
        취소
      </Button>
      <Button type="button" className={styles.editButton} onClick={clickUpdateTableHandler}>
        확인
      </Button>
    </div>
  );
};

export default TableEditModalButtonBox;
