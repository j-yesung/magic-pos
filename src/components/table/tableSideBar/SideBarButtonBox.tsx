import styles from "./styles/SideBarButtonBox.module.css"

const SideBarButtonBox = () => {
  return (
    <div className={styles['sideBarButtonBox']}>
      <button className={styles['sideBarButton']}>수정 완료</button>
      <button className={styles['sideBarButton']}>테이블 삭제</button>
    </div>
  )
}

export default SideBarButtonBox