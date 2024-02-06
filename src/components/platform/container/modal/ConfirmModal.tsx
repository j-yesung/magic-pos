import { useModal } from '@/hooks/service/ui/useModal';
import React, { useCallback } from 'react';
import Body from './body/Body';
import ModalButton from './button/ModalButton';
import styles from './styles/confirmModal.module.css';
import CloseButton from '/public/icons/close.svg';
const ConfirmModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const clickHiddenModal = useCallback(() => MagicModal.hide(modalId ?? ''), [modalId, MagicModal]);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button type="button" onClick={clickHiddenModal}>
          <CloseButton width={26} height={26} />
        </button>
      </div>
      <Body />
      <ModalButton hiddenModal={clickHiddenModal} />
    </div>
  );
};

export default React.memo(ConfirmModal);
