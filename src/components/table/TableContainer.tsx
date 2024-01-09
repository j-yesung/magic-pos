import useSetTable from "@/hooks/table/useSetTable";
import { StoreWithStoreTable, Tables, TablesInsert } from "@/types/supabase";
import TableListItem from "./TableListItem";
import styles from "./styles/TableContainer.module.css";

const TableContainer = ({ storeData }: { storeData?: StoreWithStoreTable[] }) => {
  const { addTableMutate } = useSetTable();
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
    is_disabled: false,
    max_guest: 4,
    position: maxPosition === 0 ? 1 : maxPosition?.position && maxPosition.position + 1,
    store_id: storeData?.[0]?.id
  };
  const clickAddStoreTableHandler = () => {
    if (storeData?.[0]?.id) {
      addTableMutate(newStoreTableData)
    }
  };



  return (
    <div className={styles['table-container']}>
      <div className={styles['table-title']}>테이블 관리</div>

      <ul className={styles['table-list']}>
        {
          storeData?.[0]?.store_table.map((item: Tables<'store_table'>) => {
            return <TableListItem key={item.id} storeTableData={item} />
          })
        }
        <li className={styles['table-list-button']} onClick={clickAddStoreTableHandler}>+</li>
      </ul>
    </div>
  )
}

export default TableContainer