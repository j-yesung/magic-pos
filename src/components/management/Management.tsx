import useFetchManagement from '@/hooks/management/useFetchManagement';
import useToast from '@/hooks/toast/useToast';
import { submitDetectedOrder } from '@/server/api/supabase/management';
import { useEffect } from 'react';
// import tickSound from '../../../public/audio/DingSoundEffect.mp3';
import useAuthState from '@/shared/store/session';
import ManagementContainer from './managementContainer/ManagementContainer';
import styles from './styles/Management.module.css';

const Management = () => {
  const { session, storeId } = useAuthState();
  const userId = session?.user.id;
  const { data, refetch } = useFetchManagement(userId);
  const { toast } = useToast();
  typeof window !== 'undefined' && Notification.requestPermission();
  useEffect(() => {
    submitDetectedOrder(storeId!, refetch, toast);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer managementData={data} />
      {/* <ManagementSideBar managementData={data} /> */}
    </div>
  );
};

export default Management;
