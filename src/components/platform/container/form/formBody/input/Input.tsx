import useToast from '@/hooks/service/ui/useToast';
import usePlatFormState, { setAddPlatForm, setEditPlatForm } from '@/shared/store/platform';
import { useEffect } from 'react';
import styles from './styles/input.module.css';

const Input = ({ mode }: { mode: boolean }) => {
  const { editPlatForm, isValidUrl } = usePlatFormState();
  const { toast } = useToast();
  useEffect(() => {
    if (!isValidUrl)
      toast('url 형식에 맞지 않습니다.', {
        type: 'danger',
        position: 'top-right',
        showCloseButton: false,
        autoClose: 3000,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidUrl]);
  return (
    <div className={styles.inputWrapper}>
      <input
        name="link_url"
        type="text"
        placeholder={isValidUrl ? 'link를 넣어주세요' : '형식에 맞지 않는 link입니다.'}
        className={styles.input}
        onChange={!mode ? setAddPlatForm : setEditPlatForm}
        {...(mode && { defaultValue: editPlatForm.link_url })}
      />

      <input
        className={styles.input}
        name="name"
        type="text"
        placeholder="사이트 주소"
        onChange={!mode ? setAddPlatForm : setEditPlatForm}
        {...(mode && { defaultValue: editPlatForm.name })}
      />
    </div>
  );
};

export default Input;
