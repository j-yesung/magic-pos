import { fetchStoreTable } from "@/pages/api/store-table";
import { useEffect } from "react";
import SetTableContainer from "./setTableContainer/SetTableContainer";
import styles from "./styles/setTable.module.css";

const SetTable = () => {
  useEffect(() => {
    fetchStoreTable()
  })
  return (
    <div className={styles['setTable-wrapper']}>
      <div className={styles['main-dummy-sideBar']}></div>
      <SetTableContainer />
      <div className={styles['setTable-dummy-side-bar']}></div>
    </div >
  )
}

export default SetTable