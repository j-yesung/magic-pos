import Button from '@/components/common/Button';
import { useInput } from '@/hooks/service/auth/useInput';
import { useSendMail } from '@/hooks/service/useSendEmail';
import useAuthState from '@/shared/store/session';
import { useRef } from 'react';

const SendMail = () => {
  const form = useRef<HTMLFormElement>(null);
  const { sendEmail } = useSendMail({ ref: form });
  const storeName = useAuthState(state => state.storeName);
  const { value, changeHandler } = useInput({ user_email: '' });

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label htmlFor="to_name">상호명</label>
      <input type="text" id="to_name" name="to_name" value={storeName ?? ''} disabled />
      <label htmlFor="user_email">답변 받으실 이메일을 작성해 주세요.</label>
      <input type="email" id="user_email" name="user_email" value={value.user_email} onChange={changeHandler} />
      <label>문의하실 내용을 작성해 주세요.</label>
      <textarea id="message" name="message" />
      <Button type="submit">보내기</Button>
    </form>
  );
};

export default SendMail;
