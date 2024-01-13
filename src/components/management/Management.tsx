import useFetchManagement from "@/hooks/management/useFetchManagement";
import ManagementContainer from "./managementContainer/ManagementContainer";
import ManagementSideBar from "./managementSideBar/ManagementSideBar";
import styles from "./styles/Management.module.css";

const Management = () => {

  const token = typeof window !== 'undefined' && localStorage.getItem('sb-lajnysuklrkrhdyqhotr-auth-token');
  const { user } = typeof window !== 'undefined' && token && JSON.parse(token);
  const { id } = typeof window !== 'undefined' && user;
  const { data } = useFetchManagement(id);
  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer managementData={data} />
      <ManagementSideBar managementData={data} />
    </div>
  )
}

export default Management