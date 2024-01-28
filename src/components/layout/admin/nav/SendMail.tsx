import Button from '@/components/common/Button';
import { useInput } from '@/hooks/service/auth/useInput';
import { useModal } from '@/hooks/service/ui/useModal';
import { useSendMail } from '@/hooks/service/useSendEmail';
import useAuthState from '@/shared/store/session';
import { useRef } from 'react';
import { IoClose } from 'react-icons/io5';
import styles from '../styles/SendMail.module.css';

const SendMail = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const form = useRef<HTMLFormElement>(null);
  const { sendEmail } = useSendMail({ ref: form });
  const storeName = useAuthState(state => state.storeName);
  const { value, changeHandler } = useInput({ user_email: '' });

  const clickCloseHandler = () => MagicModal.hide(modalId ?? '');

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1>문의하기</h1>
        <IoClose className={styles.ioClose} onClick={clickCloseHandler} />
      </div>
      <form className={styles.formBox} ref={form} onSubmit={sendEmail}>
        <div className={styles.inputBox}>
          <label htmlFor="to_name">상호명</label>
          <input type="text" id="to_name" name="to_name" value={storeName ?? ''} disabled />
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="user_email">답변 받으실 이메일 주소</label>
          <input type="email" id="user_email" name="user_email" value={value.user_email} onChange={changeHandler} />
        </div>
        <div className={styles.inputBox}>
          <label>문의내용</label>
          <textarea id="message" name="message" />
        </div>
        <div className={styles.buttonBox}>
          <Button type="button" className={styles.close} onClick={clickCloseHandler}>
            닫기
          </Button>
          <Button type="submit" className={styles.send}>
            보내기
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
