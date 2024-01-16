import useFetchManagement from "@/hooks/management/useFetchManagement";
import useAuthStore from "@/shared/store/auth";
import useManagementStore from "@/shared/store/management";
import ManagementContainer from "./managementContainer/ManagementContainer";
import ManagementModal from "./managementModal/ManagementModal";
import ManagementSideBar from "./managementSideBar/ManagementSideBar";
import QrCodeModal from "./qrCodeModal/QrCodeModal";
import styles from "./styles/Management.module.css";

const Management = () => {
  const { auth } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data } = useFetchManagement(id);
  const { isModal, isQRModal } = useManagementStore()

  return (
    <div className={styles['managementWrapper']}>
      {isModal && <ManagementModal />}
      {isQRModal && <QrCodeModal />}
      <ManagementContainer managementData={data} />
      <ManagementSideBar managementData={data} />
    </div>
  )
}

export default Management