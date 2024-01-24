import { useSendMail } from '@/hooks/service/useSendEmail';
import { useRef } from 'react';

const SendMail = () => {
  const form = useRef<HTMLFormElement>(null);
  const { sendEmail } = useSendMail({ ref: form });

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>상호명</label>
      <input type="text" name="to_name" value="삼성전자" readOnly />

      <label>답변 받으실 이메일을 작성해 주세요.</label>
      <input type="email" name="user_email" />

      <label>문의하실 내용을 작성해 주세요.</label>
      <textarea name="message" />

      <input type="submit" value="Send" />
    </form>
  );
};

export default SendMail;
