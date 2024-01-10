import useFetchTable from "@/hooks/table/useFetchTable";
import styles from "@/styles/Table.module.css";
import TableContainer from "./TableContainer";
import TableSideBar from "./tableSideBar/TableSideBar";

const Table = () => {
  const token = typeof window !== 'undefined' && localStorage.getItem('sb-lajnysuklrkrhdyqhotr-auth-token');
  const { user } = typeof window !== 'undefined' && token && JSON.parse(token);
  const { id } = typeof window !== 'undefined' && user;
  const { data } = useFetchTable(id);
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