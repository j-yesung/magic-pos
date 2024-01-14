import { useModal } from "@/hooks/modal/useModal";
import useManagementStore from "@/shared/store/management";
import ModalOrderListItem from "./ModalOrderListItem";
import styles from "./styles/ManagementModal.module.css";

const ManagementModal = () => {
  const { orderData } = useManagementStore();
  const { MagicModal } = useModal();

  const clickOrderConfirmHandler = () => {
    MagicModal.confirm({
      content: '주문번호 30,50 주문을 완료하시겠습니까??', confirmButtonCallback: () => { }
    })
  }

  return (
    <div className={styles['management-modal-wrapper']}>
      <div className={styles['management-modal-background']}></div>
      <div className={styles['management-modal-box']}>
        <div className={styles['modal-order-title']}>주문완료 하기</div>
        <ul className={styles['modal-order-list']}>
          {orderData.map((item) => <ModalOrderListItem key={item.id} orderData={item} />)}
        </ul>
        <div className={styles['modal-button-box']}>
          <button onClick={clickOrderConfirmHandler}>주문완료</button>
        </div>
      </div>
    </div>
  )
}

export default ManagementModal