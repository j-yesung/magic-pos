import { useInput } from '@/hooks/auth/useInput';
import useAuthStore from '@/shared/store/auth';
import { useEffect, useState } from 'react';
import Button from '../auth/Button';
import Input from '../auth/Input';
import styles from './styles/StroeContents.module.css';

const StoreContents = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { auth, storeName, storeBno} = useAuthStore();
  const { value, changeHandler } = useInput({
    storeEmail: auth?.user.email!,
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
          <Button type="button" >
            등록하기
          </Button>
        </form>
      )}
    </section>
  );
};

export default StoreContents;
