import usePlatForm from '@/hooks/platform/usePlatForm';
import clsx from 'clsx';
import styles from './styles/formButton.module.css';
const FormButton = ({ mode }: { mode: boolean }) => {
  const CANCEL_MODE = '취소';
  const REMOVE_MODE = '삭제';

  const { closePlatFormModal, clickRemoveData } = usePlatForm();

  return (
    <div className={styles.buttonGroup}>
      <button
        type="button"
        className={clsx(styles.button, {
          [styles.removeButton]: mode,
        })}
        {...(!mode && { onClick: () => closePlatFormModal(mode) })}
        {...(mode && { onClick: async () => clickRemoveData() })}
      >
        {!mode ? CANCEL_MODE : REMOVE_MODE}
      </button>
      <button type="submit" className={clsx(styles.button, styles.addButton)}>
        확인
      </button>
    </div>
  );
};

export default FormButton;
