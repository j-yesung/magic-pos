import useFetchManagement from "@/hooks/management/useFetchManagement";
import useToast from "@/hooks/toast/useToast";
import { submitDetectedOrder } from "@/server/api/supabase/management";
import useAuthStore from "@/shared/store/auth";
import { useEffect } from "react";
import ManagementContainer from "./managementContainer/ManagementContainer";
import styles from "./styles/Management.module.css";


const Management = () => {
  const { auth, storeId } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data, refetch } = useFetchManagement(id);
  const { toast } = useToast();
  typeof window !== 'undefined' && Notification.requestPermission();
  useEffect(() => {
    submitDetectedOrder(storeId!, refetch, toast)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer managementData={data} />
      {/* <ManagementSideBar managementData={data} /> */}
    </div>
  );
};

export default Management;



