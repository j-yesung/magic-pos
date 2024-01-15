import { useInput } from '@/hooks/auth/useInput';
import { useGetQuery } from '@/hooks/store/useGetQuery';
import { useStoreQuery } from '@/hooks/store/useStoreQuery';
import useAuthStore from '@/shared/store/auth';
import { useEffect, useState } from 'react';
import Button from '../auth/Button';
import Input from '../auth/Input';
import styles from './styles/StroeContents.module.css';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { auth } = useAuthStore();
  const user = auth?.user;
  const { data } = useGetQuery(user?.id || '');
  console.log('data: ', data);
  const { value, changeHandler } = useInput({
    storeEmail: user?.email ?? '',
    bnoNumber: data?.store?.[0].business_number ?? '',
    storeName: data?.store?.[0].business_name ?? '',
  });
  const { updateStoreInfomation } = useStoreQuery();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const clickStoreInfoHandler = () => {
    const userId = user?.id ?? '';
    const businessName = value.storeName;
    updateStoreInfomation({ userId, businessName });
  };

  return (
    <section className={styles.wrapper}>
      {isLoaded && user && (
        <form>
          <Input value={value} onChangeHandler={changeHandler} />
          <Button type="button" onClick={clickStoreInfoHandler}>
            등록하기
          </Button>
        </form>
      )}
    </section>
  );
};

export default StoreContents;
