import Checkbox from '@/components/common/Checkbox';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Auth.module.css';

interface SignCaptionProps {
  subUrl: string;
  subName: string;
  value: Record<string, string>;
  isCheckbox: boolean;
  setIsCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignCaption = (props: SignCaptionProps) => {
  const { subUrl, subName, value, isCheckbox, setIsCheckbox } = props;
  const { email } = value;
  const [isLoading, setIsLoading] = useState(false);

  const clickStorageSaveHandler = () => {
    setIsCheckbox(prev => !prev);
    isCheckbox ? localStorage.removeItem('email') : localStorage.setItem('email', email);
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
            <Link className={styles.caption} href={subUrl}>
              {subName}
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default SignCaption;
