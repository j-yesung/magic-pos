import emailjs from '@emailjs/browser';
import { MutableRefObject } from 'react';
import useToast from '../toast/useToast';

interface SendMailProps {
  ref: MutableRefObject<HTMLFormElement | null>;
}

const SERVICE_ID = `${process.env.NEXT_PUBLIC_SERVICE_ID}`;
const TEMPLATE_ID = `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
const PUBLIC_KEY = `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`;

export const useSendMail = ({ ref }: SendMailProps) => {
  const { toast } = useToast();

  const sendEmail = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ref.current) return;

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, ref.current, PUBLIC_KEY).then(
      result => {
        if (result.text === 'OK') {
          toast('메일이 전송되었습니다.', {
            type: 'success',
            position: 'top-right',
            showCloseButton: false,
            autoClose: 2000,
          });
        }
      },
      error => {
        if (error) {
          toast('메일 전송에 실패했습니다.', {
            type: 'danger',
            position: 'top-right',
            showCloseButton: false,
            autoClose: 2000,
          });
        }
      },
    );
  };

  return { sendEmail };
};
