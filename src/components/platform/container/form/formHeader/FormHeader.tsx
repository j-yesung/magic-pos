import usePlatForm from '@/hooks/platform/usePlatForm';
import { resetAddPlatForm, resetIsEditMode, resetPrevData, resetPrevImg } from '@/shared/store/platform';
import { useEffect } from 'react';
import styles from './styles/formHeader.module.css';
import CloseButton from '/public/icons/close.svg';

const FormHeader = ({ mode }: { mode: boolean }) => {
  const ADD_MODE = '새 플랫폼 등록';
  const EDIT_MODE = '플랫폼 수정하기';
  const { closePlatFormModal } = usePlatForm();

  useEffect(() => {
    return () => {
      if (mode) {
        resetIsEditMode();
        resetPrevData();
        resetPrevImg();
      }
      if (!mode) {
        resetPrevImg();
        resetAddPlatForm();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={styles.formHeader}>
      <p className={styles.formHeaderTitle}>{!mode ? ADD_MODE : EDIT_MODE}</p>
      <button type="button" className={styles.closeButton} onClick={() => closePlatFormModal(mode)}>
        <CloseButton />
      </button>
    </div>
  );
};

export default FormHeader;