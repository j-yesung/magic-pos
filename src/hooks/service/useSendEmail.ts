import emailjs from '@emailjs/browser';
import { MutableRefObject } from 'react';
import { useModal } from './ui/useModal';
import useToast from './ui/useToast';

interface SendMailProps {
  modalId?: string;
  ref: MutableRefObject<HTMLFormElement | null>;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SERVICE_ID = `${process.env.NEXT_PUBLIC_SERVICE_ID}`;
const TEMPLATE_ID = `${process.env.NEXT_PUBLIC_TEMPLATE_ID}`;
const PUBLIC_KEY = `${process.env.NEXT_PUBLIC_PUBLIC_KEY}`;

export const useSendMail = (props: SendMailProps) => {
  const { modalId, ref } = props;
  const { toast } = useToast();
  const { MagicModal } = useModal();

  const clickCloseHandler = () => MagicModal.hide(modalId ?? '');
  const sendEmail = (data: Inputs) => {
    if (!ref.current) return;
    if (!EMAIL_REGEX.test(data.user_email)) {
      return toast('올바른 이메일 형식이 아닙니다.', {
        type: 'danger',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
    }

    emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, ref.current, PUBLIC_KEY).then(
      result => {
        if (result.text === 'OK') {
          toast('메일이 전송되었습니다.', {
            type: 'success',
            position: 'top-center',
            showCloseButton: false,
            autoClose: 2000,
          });
          clickCloseHandler();
        }
      },
      error => {
        if (error) {
          toast('메일 전송에 실패했습니다.', {
            type: 'danger',
            position: 'top-center',
            showCloseButton: false,
            autoClose: 2000,
          });
        }
      },
    );
  };

  return { sendEmail, clickCloseHandler };
};
