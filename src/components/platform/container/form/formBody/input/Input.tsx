import usePlatFormInputWithDebounce from '@/hooks/service/platform/usePlatFormInputWithDebounce';
import usePlatFormState from '@/shared/store/platform';
import styles from './styles/input.module.css';

const Input = ({ mode }: { mode: boolean }) => {
  const editPlatForm = usePlatFormState(state => state.editPlatForm);
  const { changePlatFormCardText } = usePlatFormInputWithDebounce({ mode });

  return (
    <div className={styles.inputWrapper}>
      <input
        name="link_url"
        type="text"
        placeholder={'link를 넣어주세요'}
        className={styles.input}
        onChange={changePlatFormCardText}
        {...(mode && { defaultValue: editPlatForm.link_url })}
      />

      <input
        className={styles.input}
        name="name"
        type="text"
        placeholder="사이트 이름을 넣어주세요"
        onChange={changePlatFormCardText}
        {...(mode && { defaultValue: editPlatForm.name })}
      />
    </div>
  );
};

export default Input;
