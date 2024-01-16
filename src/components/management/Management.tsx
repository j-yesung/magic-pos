import useFetchManagement from "@/hooks/management/useFetchManagement";
import useAuthStore from "@/shared/store/auth";
import ManagementContainer from "./managementContainer/ManagementContainer";
import ManagementSideBar from "./managementSideBar/ManagementSideBar";
import styles from "./styles/Management.module.css";

const Management = () => {
  const { auth } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data } = useFetchManagement(id);

  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer managementData={data} />
      <ManagementSideBar managementData={data} />
    </div>
  )
}

export default Management