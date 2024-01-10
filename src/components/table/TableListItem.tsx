import useTableStore from "@/shared/store/table";
import { Tables } from "@/types/supabase";
import styles from "./styles/TableListItem.module.css";

const TableListItem = ({ storeTableData }: { storeTableData: Tables<'store_table'> }) => {
  const { TableItemClick } = useTableStore();

  const clickTableItemHandler = () => {
    if (storeTableData) {
      TableItemClick({
        tableId: storeTableData.id,
        tableNumber: storeTableData.position,
        maxGuest: storeTableData.max_guest,
        isDisabled: storeTableData.is_disabled,
      })
    }
  }
  return (
    <li className={styles['table-list-item']} onClick={clickTableItemHandler}>
      <span className={styles['list-text']}>테이블{storeTableData.position}</span>
      <span className={styles['list-text-hover']}>상세보기</span>
    </li>
  )
}

export default TableListItem