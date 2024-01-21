import { useInput } from '@/hooks/auth/useInput';
import useAuthState from '@/shared/store/session';
import { useEffect, useState } from 'react';
import Input from '../auth/Input';
import StoreTimeSet from './StoreTimeSet';
import styles from './styles/StroeContents.module.css';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { session, storeName, storeBno } = useAuthState();
  const userId = session?.user.id || '';
  const email = session?.user.email || '';
  const { value, changeHandler } = useInput({
    storeEmail: email,
    bnoNumber: storeBno!,
    storeName: storeName!,
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.wrapper}>
      {isLoaded && session && (
        <>
          <Input value={value} onChangeHandler={changeHandler} />
          <StoreTimeSet userId={userId} />
        </>
      )}
    </section>
  );
};

export default StoreContents;
