import Button from '@/components/common/Button';
import { useModal } from '@/hooks/service/ui/useModal';
import React from 'react';
import CsvModal from './modal/CsvModal';
import styles from './styles/excel.module.css';

const Csv = () => {
  const { MagicModal } = useModal();
  const clickShowMagicModal = () => MagicModal.fire(<CsvModal />);
  return (
    <div className={styles.container}>
      <Button type="button" onClick={clickShowMagicModal} className={styles.button}>
        매출 엑셀표 다운로드
      </Button>
    </div>
  );
};

export default React.memo(Csv);
