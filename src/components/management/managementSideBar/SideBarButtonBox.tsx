import styles from "./styles/SideBarButtonBox.module.css"

const SideBarButtonBox = () => {
  return (
    <div className={styles['side-bar-button-box']}>
      <button className={styles['side-bar-button']}>주문 완료</button>
      <button className={styles['side-bar-button']}>QR코드 출력</button>
    </div>
  )
}

export default SideBarButtonBox