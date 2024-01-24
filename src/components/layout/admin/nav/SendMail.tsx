import Button from '@/components/common/Button';
import { useInput } from '@/hooks/service/auth/useInput';
import { useSendMail } from '@/hooks/service/useSendEmail';
import useAuthState from '@/shared/store/session';
import { useRef } from 'react';
import styles from '../styles/SendMail.module.css';

const SendMail = () => {
  const form = useRef<HTMLFormElement>(null);
  const { sendEmail } = useSendMail({ ref: form });
  const storeName = useAuthState(state => state.storeName);
  const { value, changeHandler } = useInput({ user_email: '' });

  return (
    <div className={styles.wrapper}>
      <h1>문의사항</h1>
      <form className={styles.formBox} ref={form} onSubmit={sendEmail}>
        <div className={styles.inputBox}>
          <label htmlFor="to_name">상호명</label>
          <input type="text" id="to_name" name="to_name" value={storeName ?? ''} disabled />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="user_email">답변 받으실 이메일을 작성해 주세요.</label>
          <input type="email" id="user_email" name="user_email" value={value.user_email} onChange={changeHandler} />
        </div>
        <div className={styles.inputBox}>
          <label>문의하실 내용을 작성해 주세요.</label>
          <textarea id="message" name="message" />
        </div>
        <Button type="submit">보내기</Button>
      </form>
    </div>
  );
};

export default SendMail;
