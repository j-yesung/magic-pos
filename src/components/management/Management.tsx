import useFetchManagement from "@/hooks/management/useFetchManagement";
import { submitDetectedOrder } from "@/server/api/supabase/management";
import useAuthStore from "@/shared/store/auth";
import ManagementContainer from "./managementContainer/ManagementContainer";
import styles from "./styles/Management.module.css";

const Management = () => {
  const { auth, storeId } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data, refetch } = useFetchManagement(id);
  submitDetectedOrder(storeId!, refetch)

  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer managementData={data} />
      {/* <ManagementSideBar managementData={data} /> */}
    </div>
  )
}

export default Management