import SetTableListItem from "./setTableListitem/SetTableListItem";
import styles from "./styles/setTableContainer.module.css";

const SetTableContainer = () => {
  return (
    <div className={styles['setTable-container']}>
      <div className={styles['setTable-title']}>테이블 추가</div>

      <ul className={styles['setTable-list']}>
        {
          [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((tableNumber: number) => {
            return <SetTableListItem key={tableNumber} tableNumber={tableNumber} />
          })
        }
      </ul>
    </div>
  )
}

export default SetTableContainer