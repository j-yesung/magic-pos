import Button from '@/components/common/Button';
import { LOGIN_PATH } from '@/data/url-list';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Auth.module.css';

const SUCCESS_IMAGE_PATH = '/icons/success.svg';

const SignupSuccess = () => {
  const router = useRouter();

  return (
    <div className={styles.formContainer}>
      <form>
        <div className={styles.titleWrapper}>
          <h1 className={`${styles.title} ${styles.black}`}>회원가입 완료</h1>
        </div>
        <div className={styles.successImage}>
          <Image src={SUCCESS_IMAGE_PATH} alt="success-img" width={200} height={200} />
        </div>
        <div className={styles.center}>
          <p>회원가입을 환영합니다!</p>
          <p>지금 바로 매직포스를 시작해 볼까요?</p>
        </div>
        <div className={styles.fieldContainer}>
          <div className={styles.buttonBox}>
            <Button type="button" className={styles.submitButton} onClick={() => router.push(LOGIN_PATH)}>
              시작하기
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignupSuccess;
