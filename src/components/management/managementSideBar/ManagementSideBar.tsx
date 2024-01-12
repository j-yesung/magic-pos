import { StoreWithOrderInfo } from "@/types/supabase"
import React from "react"
import SideBarButtonBox from "./SideBarButtonBox"
import SideBarContainer from "./SideBarContainer"
import styles from "./styles/ManagementSideBar.module.css"


const ManagementSideBar = ({ managementData }: {managementData?: StoreWithOrderInfo[]}) => {
  return (
    <div className={styles['side-bar-wrapper']}>
      <div className={styles['side-bar-title']}>
        테이블 1
      </div>
      <SideBarContainer />
      <SideBarButtonBox />
    </div>
  )
}

export default ManagementSideBar