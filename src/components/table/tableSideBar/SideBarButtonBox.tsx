import styles from "@/styles/SideBarButtonBox.module.css"

const SideBarButtonBox = () => {
  return (
    <div className={styles['side-bar-button-box']}>
      <button className={styles['side-bar-button']}>수정 완료</button>
      <button className={styles['side-bar-button']}>테이블 삭제</button>
    </div>
  )
}

export default SideBarButtonBox