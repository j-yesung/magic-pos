import Checkbox from '@/components/common/Checkbox';
import { changeCheckBox } from '@/shared/store/toggle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Auth.module.css';

const URL = '/auth/resetPassword';

interface SignCaptionProps {
  email: string;
  isCheckbox: boolean;
}

const SignCaption = (props: SignCaptionProps) => {
  const { email, isCheckbox } = props;
  const [isLoading, setIsLoading] = useState(false);

  const clickStorageSaveHandler = () => {
    isCheckbox ? localStorage.removeItem('email') : localStorage.setItem('email', email);
    changeCheckBox();
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);

  return (
    <>
      {isLoading && (
        <div className={styles.captionBox}>
          <div className={styles.checkbox}>
            <Checkbox onClick={clickStorageSaveHandler} defaultChecked={isCheckbox} />
            <p>이메일 저장</p>
          </div>
          <div className={styles.findPasswordBox}>
            <Link className={styles.caption} href={URL}>
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignCaption;
