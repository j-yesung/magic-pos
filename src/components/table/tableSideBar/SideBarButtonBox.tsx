import useSetTable from '@/hooks/table/useSetTable';
import useTableStore from '@/shared/store/table';
import { StoreWithStoreTable } from '@/types/supabase';
import { useQueryClient } from '@tanstack/react-query';
import styles from "./styles/SideBarButtonBox.module.css";

const SideBarButtonBox = () => {
  const { tableId, maxGuest, isDisabled } = useTableStore();
  const { updateMutate } = useSetTable()
  const client = useQueryClient();
  const data = client.getQueryData<StoreWithStoreTable[]>(["table"]);
  const storeData = data?.[0].store_table
  const tableData = storeData?.filter((x) => x.id === tableId)
  console.log(tableData)

  const updateStoreTableData = {
    id: tableId,
    is_disabled: isDisabled,
    max_guest: maxGuest
  }

  const clickUpdateTableHandler = () => {
    if (data) {
      if (window.confirm("수정하시겠습니까?")) {
        if (tableData?.[0]?.is_disabled === isDisabled && tableData?.[0]?.max_guest === maxGuest) {
          alert("수정사항이 없습니다.")
        } else {
          updateMutate(updateStoreTableData)
        }
      } else {
        return
      }
    }
  }
  return (
    <div className={styles['side-bar-button-box']}>
      <button className={styles['side-bar-button']} onClick={clickUpdateTableHandler}>수정 완료</button>
      <button className={styles['side-bar-button']}>테이블 삭제</button>
    </div>
  )
}

export default SideBarButtonBox