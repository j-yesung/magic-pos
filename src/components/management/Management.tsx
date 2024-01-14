import useFetchManagement from "@/hooks/management/useFetchManagement";
import useAuthStore from "@/shared/store/auth";
import useManagementStore from "@/shared/store/management";
import ManagementModal from "./ManagementModal";
import ManagementContainer from "./managementContainer/ManagementContainer";
import ManagementSideBar from "./managementSideBar/ManagementSideBar";
import styles from "./styles/Management.module.css";

const Management = () => {
  const { auth } = useAuthStore();
  const user = auth?.user;
  const id: string = user?.id;
  // const token = typeof window !== 'undefined' && localStorage.getItem('sb-lajnysuklrkrhdyqhotr-auth-token');
  // const { user } = typeof window !== 'undefined' && token && JSON.parse(token);
  // const { id } = typeof window !== 'undefined' && user;
  const { data } = useFetchManagement(id);
  const { isModal } = useManagementStore()
  console.log(user)
  return (
    <div className={styles['managementWrapper']}>
      {isModal && <ManagementModal />}
      <ManagementContainer managementData={data} />
      <ManagementSideBar managementData={data} />
    </div>
  )
}

export default Management