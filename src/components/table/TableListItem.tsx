import styles from "@/styles/TableListItem.module.css";
import { Tables } from "@/types/supabase";

const TableListItem = ({ storeTableData }: { storeTableData: Tables<'store_table'> }) => {
  return (
    <li className={styles['table-list-item']}>
      <span className={styles['list-text']}>테이블{storeTableData.position}</span>
      <span className={styles['list-text-hover']}>상세보기</span>
    </li>
  )
}

export default TableListItem