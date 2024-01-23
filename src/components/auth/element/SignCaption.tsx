import Checkbox from '@/components/common/Checkbox';
import Link from 'next/link';
import styles from '../styles/Auth.module.css';

interface SignCaptionProps {
  subUrl: string;
  subName: string;
}

const SignCaption = (props: SignCaptionProps) => {
  const { subUrl, subName } = props;

  return (
    <div className={styles.captionBox}>
      <div className={styles.checkbox}>
        <Checkbox />
        <p>이메일 저장</p>
      </div>
      <div className={styles.findPasswordBox}>
        <Link className={styles.caption} href={subUrl}>
          {subName}
        </Link>
      </div>
    </div>
  );
};

export default SignCaption;
