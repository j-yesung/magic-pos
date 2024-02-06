import useAuthState from '@/shared/store/session';
import useTableStore, { TableItemType } from '@/shared/store/table';
import { StoreWithStoreTable, TablesInsert } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import { ReactElement } from 'react';
import { QUERY_KEY } from '../../query/table/useFetchTable';
import useSetTable from '../../query/table/useSetTable';
import { useModal } from '../ui/useModal';
import useToast from '../ui/useToast';

const useClickCUDHandler = () => {
  const { addMutate, updateMutate, deleteMutate, addIsPending, updateIsPending } = useSetTable();
  const { session } = useAuthState();
  const { MagicModal } = useModal();
  const { toast } = useToast();
  const { TableItemClick } = useTableStore();
  const { tableId, maxGuest, isDisabled } = useTableStore();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<StoreWithStoreTable[]>([QUERY_KEY.TABLE, session?.user.id]);
  const storeData = data![0];
  const storeId = storeData.id;
  const tablePosition = storeData.store_table.map(table => table.position as number);
  const tableIdInOrderStore = storeData.order_store.map(order => order.table_id);
  const tableData = storeData.store_table.filter(x => x.id === tableId);

  /**
   * position값중 가장 큰수 추출
   */

  const maxPosition = tablePosition.length === 0 ? 0 : Math.max(...tablePosition);

  /**
   * 테이블 추가
   */
  const clickAddStoreTableHandler = () => {
    /**
     * 총테이블 중 빈테이블 번호 찿기
     */
    const notTable = [];
    for (let i = 0; i < maxPosition!; i++) {
      if (i !== 0 && notTable.length < 1 && !tablePosition.includes(i)) notTable.push(i);
    }
    /**
     * store_table에 insert할때 필요한 데이터
     * 테이블 이 없으면 테이블 번호 1
     * 테이블이 있으면 테이블 번호 중 가장큰번호 + 1
     * 중간에 테이블번호가 비어있으면 비어있는 테이블 번호부터 등록
     */
    const newStoreTableData: TablesInsert<'store_table'> = {
      is_disabled: 0,
      max_guest: 4,
      position: notTable.length !== 0 ? notTable[0] : maxPosition! + 1,
      store_id: storeId,
    };

    if (storeId) {
      addMutate(newStoreTableData);
    }
  };

  /**
   * 테이블 수정 정보
   */
  const updateStoreTableData = {
    id: tableId,
    is_disabled: isDisabled,
    max_guest: maxGuest,
  };

  /**
   * 테이블 정보 수정
   */
  const clickUpdateTableHandler = () => {
    if (tableData) {
      if (tableData?.[0]?.is_disabled === isDisabled && tableData?.[0]?.max_guest === maxGuest) {
        toast('수정사항이 없습니다', {
          type: 'danger',
          position: 'top-center',
          showCloseButton: false,
          autoClose: 2000,
        });
      } else if (tableId && tableIdInOrderStore?.includes(tableId)) {
        toast('주문내역이 있는 테이블은 수정할 수 없습니다', {
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

  /**
   * 테이블 삭제
   * @param storeTableId 삭제할때 필요한 tableId
   * @param ExclamationMark 모달에 들어갈 svg
   */
  const clickDeleteTableHandler = (storeTableId: string, ExclamationMark: ReactElement) => {
    if (tableIdInOrderStore?.includes(storeTableId)) {
      toast('주문이 있는 테이블은 삭제할 수 없습니다', {
        type: 'danger',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
    } else {
      MagicModal.confirm({
        icon: ExclamationMark,
        content: '정말로 삭제하시겠습니까?',
        confirmButtonCallback: () => {
          deleteMutate(storeTableId);
        },
      });
    }
  };

  /**
   * 수정 모달 띄우기
   * @param tableItemData 수정 모달에 띄워줄 tableItemData
   * @param TableEditModal 수정 모달 컴포넌트
   */
  const clickOpenEditModalHandler = (tableItemData: TableItemType, TableEditModal: ReactElement) => {
    TableItemClick(tableItemData);
    MagicModal.fire(TableEditModal);
  };

  /**
   * 모달창 닫기
   * @param modalId 모달을 close하기 위한 모달 id
   */
  const clickCloseModalHandler = (modalId?: string) => {
    MagicModal.hide(modalId ?? '');
  };

  return {
    clickAddStoreTableHandler,
    clickUpdateTableHandler,
    clickDeleteTableHandler,
    clickOpenEditModalHandler,
    clickCloseModalHandler,
    addIsPending,
    updateIsPending,
  };
};

export default useClickCUDHandler;
