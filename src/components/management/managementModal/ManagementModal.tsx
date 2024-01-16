import useSetManagement from "@/hooks/management/useSetManagement";
import { useModal } from "@/hooks/modal/useModal";
import useManagementStore from "@/shared/store/management";
import ModalOrderListItem from "./ModalOrderListItem";
import styles from "./styles/ManagementModal.module.css";

const ManagementModal = () => {
  const { orderData, orderConfirmData } = useManagementStore();
  const { MagicModal } = useModal();
  const { mutate } = useSetManagement();

  const clickOrderConfirmHandler = () => {
    if (orderConfirmData.length === 0) {
      MagicModal.alert({ content: '선택하신 주문이 없습니다' });
    } else {
      MagicModal.confirm({
        content: `주문번호 ${orderConfirmData.map((x) => x.number + '번 ')} 주문을 완료하시겠습니까?`, confirmButtonCallback: () => {
          mutate(orderConfirmData)
        }
      })
    }
  }
  return (
    <div className={styles['management-modal-box']}>
      <div className={styles['modal-order-title']}>주문완료 하기</div>
      <ul className={styles['modal-order-list']}>
        {orderData.map((item) => <ModalOrderListItem key={item.id} orderData={item} />)}
      </ul>
      <div className={styles['modal-button-box']}>
        <button onClick={clickOrderConfirmHandler}>{
          orderConfirmData.map((item) => <span key={item.id}>{item.number}번&nbsp;</span>)
        } 주문완료하기</button>
      </div>
    </div>
  )
}

export default ManagementModal