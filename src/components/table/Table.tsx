import useFetchTable from "@/hooks/table/useFetchTable";
import useTableStore from "@/shared/store/table";
import { useEffect, useRef } from "react";
import TableContainer from "./TableContainer";
import styles from "./styles/Table.module.css";
import TableSideBar from "./tableSideBar/TableSideBar";

const Table = () => {
  const token = typeof window !== 'undefined' && localStorage.getItem('sb-lajnysuklrkrhdyqhotr-auth-token');
  const { user } = typeof window !== 'undefined' && token && JSON.parse(token);
  const { id } = typeof window !== 'undefined' && user;
  const { data } = useFetchTable(id);
  const dummySideBarRef = useRef<HTMLDivElement>(null)
  const { setDummySideBarRef } = useTableStore();

  useEffect(() => { 
    setDummySideBarRef(dummySideBarRef)
  },[])
  return (
    <div className={styles['table-wrapper']}>
      {data && <TableContainer storeData={data} />}
      <div className={styles['table-dummy-side-bar']} ref={dummySideBarRef}></div>
      <TableSideBar />
    </div>
  )
}

export default Table