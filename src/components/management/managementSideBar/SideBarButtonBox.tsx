import { useModal } from "@/hooks/modal/useModal"
import useManagementStore from "@/shared/store/management"
import ManagementModal from "../managementModal/ManagementModal"
import QrCodeModal from "../qrCodeModal/QrCodeModal"
import styles from "./styles/SideBarButtonBox.module.css"

const SideBarButtonBox = () => {
  const { orderData, isModal, setIsModal, isQRModal, setIsQRModal } = useManagementStore()
  const { MagicModal } = useModal()

  const clickOrderConfirmHandler = () => {
    if (orderData.length === 0) {
      MagicModal.alert({ content: '선택한 주문내역이 없습니다.' });
      return
    } else {
      MagicModal.fire(<ManagementModal />)
    }
  }
  const clickQRModalHandler = () => {
    MagicModal.fire(<QrCodeModal />)
  }

  return (
    <div className={styles['side-bar-button-box']}>
      <button className={styles['side-bar-button']} onClick={clickOrderConfirmHandler}>주문 완료</button>
      <button className={styles['side-bar-button']} onClick={clickQRModalHandler}>QR코드 출력</button>
    </div>
  )
}

export default SideBarButtonBox