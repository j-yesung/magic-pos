import useSetTable from "@/hooks/table/useSetTable";
import { StoreWithStoreTable, Tables, TablesInsert } from "@/types/supabase";
import TableListItem from "./TableListItem";
import styles from "./styles/TableContainer.module.css";

const TableContainer = ({ storeData }: { storeData: StoreWithStoreTable[] }) => {
  const { addMutate } = useSetTable();
  /**
   * position값중 가장 큰수 추출
   */
  const maxPosition = storeData?.[0]?.store_table.length === 0
    ? 0
    : storeData?.[0]?.store_table.reduce((prev, value) => {
      return prev.position && value.position && prev.position >= value.position ? prev : value
    });
  /**
   * store_table에 insert할때 필요한 데이터
   */
  const newStoreTableData: TablesInsert<'store_table'> = {
    is_disabled: 0,
    max_guest: 4,
    position: maxPosition === 0 ? 1 : maxPosition?.position && maxPosition.position + 1,
    store_id: storeData?.[0]?.id
  };
  const clickAddStoreTableHandler = () => {
    if (storeData?.[0]?.id) {
      addMutate(newStoreTableData)
    }
  };



  return (
    <div className={styles['table-container']}>
      {
        storeData?.[0]?.store_table.sort((a, b) => {
          if (a.position && b.position) {
            return a.position < b.position ? -1 : 1
          }
          return 0
        }).map((item: Tables<'store_table'>, index: number) => {
          return <TableListItem key={item.id} storeTableData={item} index={index} />
        })
      }
      <div className={styles['table-list-button']} onClick={clickAddStoreTableHandler}>+</div>
    </div>
  )
}

export default TableContainer