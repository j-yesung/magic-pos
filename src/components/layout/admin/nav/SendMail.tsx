import { useSendMail } from '@/hooks/service/useSendEmail';
import { useRef } from 'react';

const SendMail = () => {
  const form = useRef<HTMLFormElement>(null);
  const { sendEmail } = useSendMail({ form });

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Subject</label>
      <input type="text" name="to_name" value="삼성전자" readOnly />

      <label>Name</label>
      <input type="text" name="from_name" />

      <label>Email</label>
      <input type="email" name="user_email" />

      <label>Message</label>
      <textarea name="message" />

      <input type="submit" value="Send" />
    </form>
  );
};

export default SendMail;
