import useFetchManagement from '@/hooks/query/management/useFetchManagement';
import useToast from '@/hooks/service/ui/useToast';
import { submitDetectedOrder } from '@/server/api/supabase/management';
import useAuthState from '@/shared/store/session';
import { useEffect, useRef } from 'react';
import ManagementContainer from './managementContainer/ManagementContainer';
import ManagementSideBar from './managementSideBar/ManagementSideBar';
import styles from './styles/Management.module.css';
import soundEffect from '/public/sound/soundEffect.mp3';

const Management = () => {
  const { session, storeId } = useAuthState();
  const userId = session?.user.id;
  const { data, refetch } = useFetchManagement(userId);
  const { toast } = useToast();
  const soundButtonRef = useRef<HTMLDivElement>(null);
  const audio = new Audio(soundEffect);
  typeof window !== 'undefined' && Notification.requestPermission();

  useEffect(() => {
    const synth = window.speechSynthesis;
    submitDetectedOrder(storeId!, refetch, toast, soundButtonRef, synth);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles['managementWrapper']}>
      <ManagementContainer managementData={data} />
      <ManagementSideBar managementData={data} />
      {/* 효과음 Mp3파일을 재생하기위한 버튼 */}
      <div
        className={styles['MP3-button']}
        ref={soundButtonRef}
        onClick={() => {
          audio.play();
        }}
      ></div>
    </div>
  );
};

export default Management;
