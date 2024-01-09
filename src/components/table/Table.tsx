import useFetchTable from "@/hooks/table/useFetchTable";
import { useRouter } from "next/router";
import TableContainer from "./TableContainer";
import styles from "./styles/Table.module.css";
import TableSideBar from "./tableSideBar/TableSideBar";

const Table = () => {
  const { query } = useRouter();
  const { storeId } = query;
  const { data } = useFetchTable(storeId);
  return (
    <div className={styles['table-wrapper']}>
      <div className={styles['main-dummy-sideBar']}></div>
      <TableContainer storeData={data} />
      <div className={styles['table-dummy-side-bar']}></div>
      <TableSideBar />
    </div>
  )
}

export default Table