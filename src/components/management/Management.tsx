import useFetchManagement from "@/hooks/management/useFetchManagement";
import useToast from "@/hooks/toast/useToast";
import { submitDetectedOrder } from "@/server/api/supabase/management";
import useAuthStore from "@/shared/store/auth";
import { useRef } from "react";
import tickSound from '../../../public/audio/DingSoundEffect.mp3';
import ManagementContainer from "./managementContainer/ManagementContainer";
import styles from "./styles/Management.module.css";

const Management = () => {
  const { auth, storeId } = useAuthStore();
  const user = auth?.user;
  const id = user?.id;
  const { data, refetch } = useFetchManagement(id);
  const { toast } = useToast();
  const audioRef = useRef<HTMLButtonElement>(null);
  const tick = typeof Audio !== "undefined" && new Audio(tickSound);
  submitDetectedOrder(storeId!, refetch, toast, audioRef)

  return (
    <div className={styles['managementWrapper']}>
      <button className={styles['audio-button']} ref={audioRef} onClick={() => { tick && tick.play(); }} ></button>
      <ManagementContainer managementData={data} />
      {/* <ManagementSideBar managementData={data} /> */}
    </div>
  );
};

export default Management;
