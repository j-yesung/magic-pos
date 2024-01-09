import styles from "@/styles/SideBarContainer.module.css"

const SideBarContainer = () => {
  return (
    <div className={styles['sideBarContainer']}>
      <div className={styles['sideBarTextbox']}>
        <label>최대인웓 수</label>
        <input type="number" />
      </div>
      <div className={styles['sideBarTextbox']}>
        <label>사용 여부</label>
        <select>
          <option value="사용" key="사용">사용</option>
          <option value="미사용" key="미사용">미사용</option>
        </select>
      </div>
    </div>
  )
}

export default SideBarContainer