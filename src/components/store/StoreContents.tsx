import { useInput } from '@/hooks/auth/useInput';
import { useGetQuery } from '@/hooks/store/useGetQuery';
import useAuthStore from '@/shared/store/auth';
import { useEffect, useState } from 'react';
import Input from '../auth/Input';
import styles from './styles/StroeContents.module.css';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { auth } = useAuthStore();
  const user = auth?.user;
  const { storeBnoNumber } = useGetQuery(user?.id || '');
  const { value, changeHandler } = useInput({
    storeEmail: user?.email ?? '',
    bnoNumber: storeBnoNumber?.store?.[0].business_number ?? '',
    storeName: '',
  });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className={styles.wrapper}>
      {isLoaded && user && <Input value={value} onChangeHandler={changeHandler} />}
    </section>
  );
};

export default StoreContents;
