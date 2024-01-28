import usePlatFormState, { setAddPlatForm, setEditPlatForm } from '@/shared/store/platform';
import styles from './styles/input.module.css';

const Input = ({ mode }: { mode: boolean }) => {
  const { editPlatForm, isValidUrl } = usePlatFormState();
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
