import React from "react";
import styles from "./styles/setTableListItem.module.css";

const SetTableListItem = ({ tableNumber }: { tableNumber: string }) => {
  return (
    <li className={styles['setTable-list-item']}>
      <span className={styles['list-text']}>테이블{tableNumber}</span>
      <span className={styles['list-text-hover']}>상세보기</span>
    </li>
  )
}

export default SetTableListItem