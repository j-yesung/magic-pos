import Checkbox from '@/components/common/Checkbox';
import { FIND_PASSWORD_PATH } from '@/data/url-list';
import { changeCheckBox } from '@/shared/store/toggle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Auth.module.css';

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

  useEffect(() => {
    if (isCheckbox && email) localStorage.setItem('email', email);
  }, [email, isCheckbox]);

  return (
    <>
      {isLoading && (
        <div className={styles.captionBox}>
          <div className={styles.checkbox}>
            <Checkbox onClick={clickStorageSaveHandler} defaultChecked={isCheckbox} />
            <p>이메일 저장</p>
          </div>
          <div className={styles.findPasswordBox}>
            <Link className={styles.caption} href={FIND_PASSWORD_PATH}>
              비밀번호를 잊으셨나요?
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignCaption;
