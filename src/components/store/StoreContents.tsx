import { useInput } from '@/hooks/auth/useInput';
import useAuthStore from '@/shared/store/auth';
import { useEffect, useState } from 'react';
import Input from '../auth/Input';
import StoreTimeSet from './StoreTimeSet';
import styles from './styles/StroeContents.module.css';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { auth, storeName, storeBno } = useAuthStore();
  const userId = auth?.user.id || '';
  const email = auth?.user.email || '';
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
      {isLoaded && auth && (
        <form>
          <Input value={value} onChangeHandler={changeHandler} />
          <StoreTimeSet userId={userId} />
        </form>
      )}
    </section>
  );
};

export default StoreContents;
