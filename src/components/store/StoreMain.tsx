import useAuthState from '@/shared/store/session';
import { useEffect, useState } from 'react';
import styles from './styles/StoreContents.module.css';
import ConfirmTable from './sub-component/ConfirmTable';
import StoreInfo from './sub-component/StoreInfo';
import StoreTimeSet from './sub-component/StoreTimeSet';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { session, storeName, storeBno } = useAuthState();
  const userId = session?.user.id || '';
  const email = session?.user.email || '';

  const storeInfo = [
    { id: 1, label: '이메일', htmlFor: 'email', name: email },
    { id: 2, label: '상호명', htmlFor: 'storeName', name: storeName },
    { id: 3, label: '사업자등록번호', htmlFor: 'businessNumber', name: storeBno },
  ];

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.wrapper}>
      {isLoaded && session && (
        <>
          <StoreInfo storeInfo={storeInfo} />
          <ConfirmTable />
          <StoreTimeSet userId={userId} />
        </>
      )}
    </section>
  );
};

export default StoreContents;
