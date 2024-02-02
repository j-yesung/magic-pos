import LoadingSpinner from '@/components/common/LoadingSpinner';
import usePlatForm from '@/hooks/platform/usePlatForm';
import { useModal } from '@/hooks/service/ui/useModal';
import clsx from 'clsx';
import ConfirmModal from '../../modal/ConfirmModal';
import styles from './styles/formButton.module.css';

const CANCEL_MODE = '취소';
const REMOVE_MODE = '삭제';

const FormButton = ({ mode, isPending }: { mode: boolean; isPending: boolean }) => {
  const { MagicModal } = useModal();
  const { closePlatFormModal } = usePlatForm();

  return (
    <div className={styles.buttonGroup}>
      <button
        type="button"
        className={clsx(styles.button, {
          [styles.removeButton]: mode,
        })}
        {...(!mode && { onClick: () => closePlatFormModal(mode) })}
        {...(mode && { onClick: () => MagicModal.fire(<ConfirmModal />) })}
      >
        {!mode ? CANCEL_MODE : REMOVE_MODE}
      </button>
      <button type="submit" className={clsx(styles.button, styles.addButton)}>
        {isPending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : '확인'}
      </button>
    </div>
  );
};

export default FormButton;
