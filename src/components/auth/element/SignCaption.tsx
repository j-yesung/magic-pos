import Checkbox from '@/components/common/Checkbox';
import { changeCheckBox } from '@/shared/store/toggle';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from '../styles/Auth.module.css';

interface SignCaptionProps {
  subUrl: string;
  subName: string;
  isCheckbox: boolean;
  value: Record<string, string>;
}

const SignCaption = (props: SignCaptionProps) => {
  const { subUrl, subName, isCheckbox, value } = props;
  const { email } = value;
  const [isLoading, setIsLoading] = useState(false);

  const clickStorageSaveHandler = () => {
    changeCheckBox();
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
