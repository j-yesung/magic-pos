import useFetchTable from "@/hooks/table/useFetchTable";
import useAuthStore from "@/shared/store/auth";
import useTableStore from "@/shared/store/table";
import { useEffect, useRef } from "react";
import TableContainer from "./TableContainer";
import styles from "./styles/Table.module.css";
import TableSideBar from "./tableSideBar/TableSideBar";

const Table = () => {
  const { auth } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data } = useFetchTable(id);
  const dummySideBarRef = useRef<HTMLDivElement>(null)
  const { setDummySideBarRef } = useTableStore();

  useEffect(() => {
    setDummySideBarRef(dummySideBarRef)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div className={styles['table-wrapper']}>
      {data && <TableContainer storeData={data} />}
      <div className={styles['table-dummy-side-bar']} ref={dummySideBarRef}></div>
      <TableSideBar />
    </div>
  )
}

export default Table