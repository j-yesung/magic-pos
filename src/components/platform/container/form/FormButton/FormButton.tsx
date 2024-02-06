import LoadingSpinner from '@/components/common/LoadingSpinner';
import usePlatForm from '@/hooks/service/platform/usePlatForm';
import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import clsx from 'clsx';
import React from 'react';
import styles from './styles/formButton.module.css';
import Alert from '/public/icons/alert-circle.svg';

const CANCEL_MODE = '취소';
const REMOVE_MODE = '삭제';

const FormButton = ({ mode, isPending }: { mode: boolean; isPending: boolean }) => {
  const { MagicModal } = useModal();
  const { clickRemoveData } = usePlatForm();
  const { toast } = useToast();
  const { closePlatFormModal } = usePlatForm();

  const handleClickDelete = () => {
    clickRemoveData().then(() => {
      toast('삭제가 완료 됬습니다.', {
        type: 'warn',
        position: 'top-center',
        showCloseButton: true,
        autoClose: 2000,
      });
    });
  };

  return (
    <div className={styles.buttonGroup}>
      <button
        type="button"
        className={clsx(styles.button, {
          [styles.removeButton]: mode,
        })}
        {...(!mode && { onClick: () => closePlatFormModal(mode) })}
        {...(mode && {
          onClick: () =>
            MagicModal.confirm({
              content: '플랫폼을 삭제하시겠습니까?',
              icon: <Alert width={48} height={48} />,
              confirmButtonCallback: handleClickDelete,
            }),
        })}
      >
        {!mode ? CANCEL_MODE : REMOVE_MODE}
      </button>
      <button type="submit" disabled={isPending} className={clsx(styles.button, styles.addButton)}>
        {isPending ? <LoadingSpinner boxSize={2.8} ballSize={0.4} /> : '확인'}
      </button>
    </div>
  );
};

export default React.memo(FormButton);
