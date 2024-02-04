import Input from '@/components/auth/element/Input';
import Button from '@/components/common/Button';
import { sendEmailInput } from '@/data/input-props';
import { useSendMail } from '@/hooks/service/useSendEmail';
import useAuthState from '@/shared/store/session';
import { Fragment, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IoClose as CloseButton } from 'react-icons/io5';
import styles from '../styles/SendMail.module.css';

const INPUT_STORE_NAME = 'to_name';

const SendMail = ({ modalId }: { modalId?: string }) => {
  const form = useRef<HTMLFormElement>(null);
  const { sendEmail, clickCloseHandler } = useSendMail({ ref: form, modalId });
  const { setValue, register, handleSubmit } = useForm();
  const storeName = useAuthState(state => state.storeName);

  const clickSendEmailHandler: SubmitHandler<Inputs> = data => sendEmail(data);

  useEffect(() => {
    setValue('to_name', storeName);
  }, [setValue, storeName]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <h1>문의하기</h1>
        <CloseButton className={styles.ioClose} onClick={clickCloseHandler} />
      </div>
      <form className={styles.formBox} ref={form} onSubmit={handleSubmit(clickSendEmailHandler)}>
        {sendEmailInput.map(field => (
          <Fragment key={field.unique}>
            <div className={styles.inputBox}>
              <Input
                id={field.id}
                name={field.name}
                type={field.type}
                label={field.label}
                register={register}
                isSuccessful={field.name === INPUT_STORE_NAME && true}
                validation={field.validation}
              />
            </div>
          </Fragment>
        ))}
        <div className={styles.inputBox}>
          <label>문의내용</label>
          <textarea id="message" name="message" placeholder="문의내용을 작성해 주세요." />
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
