import { useModal } from '@/hooks/modal/useModal';
import useSetTable from '@/hooks/table/useSetTable';
import useTableStore from '@/shared/store/table';
import { StoreWithStoreTable } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import styles from "./styles/SideBarButtonBox.module.css";
// import MagicModal


const SideBarButtonBox = () => {
  const { tableId, maxGuest, isDisabled } = useTableStore();
  const { updateMutate, deleteMutate } = useSetTable()
  const client = useQueryClient();
  const data = client.getQueryData<StoreWithStoreTable[]>(["table"]);
  const storeData = data?.[0]?.store_table
  const tableData = storeData?.filter((x) => x.id === tableId)
  const { MagicModal } = useModal()

  const updateStoreTableData = {
    id: tableId,
    is_disabled: isDisabled,
    max_guest: maxGuest
  }

  const clickUpdateTableHandler = () => {
    if (data) {
      if (tableData?.[0]?.is_disabled === isDisabled && tableData?.[0]?.max_guest === maxGuest) {
        MagicModal.alert({ content: '수정사항이 없습니다.' });
      } else {
        MagicModal.confirm({
          content: '수정하시겠습니까?', confirmButtonCallback: () => { updateMutate(updateStoreTableData) }
        })
      }
    }
  }

  const clickDeleteTableHandler = () => {
    MagicModal.confirm({ content: '정말로 삭제하시겠습니까?', confirmButtonCallback: () => { deleteMutate(tableId) } })
  }
  return (
    <div className={styles['side-bar-button-box']}>
      <button className={styles['side-bar-button']} onClick={clickUpdateTableHandler}>수정 완료</button>
      <button className={styles['side-bar-button']} onClick={clickDeleteTableHandler}>테이블 삭제</button>
    </div>
  )
}

export default SideBarButtonBox