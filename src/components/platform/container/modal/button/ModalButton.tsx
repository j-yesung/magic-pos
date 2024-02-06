import Button from '@/components/common/Button';
import usePlatForm from '@/hooks/service/platform/usePlatForm';
import useToast from '@/hooks/service/ui/useToast';
import clsx from 'clsx';
import React from 'react';
import styles from '../styles/confirmModal.module.css';
const ModalButton = ({ hiddenModal }: { hiddenModal: () => void }) => {
  const { clickRemoveData } = usePlatForm();
  const { toast } = useToast();
  return (
    <div className={styles.buttonGroup}>
      <Button type="button" className={styles.button} onClick={hiddenModal}>
        취소
      </Button>
      <Button
        type="button"
        className={clsx(styles.button, styles.buttonConfirm)}
        onClick={async () =>
          await clickRemoveData().then(() => {
            hiddenModal();
            toast('삭제가 완료 됬습니다.', {
              type: 'warn',
              position: 'top-center',
              showCloseButton: true,
              autoClose: 2000,
            });
          })
        }
      >
        확인
      </Button>
    </div>
  );
};

export default React.memo(ModalButton);
