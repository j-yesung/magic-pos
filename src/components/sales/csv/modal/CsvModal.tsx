import { useModal } from '@/hooks/service/ui/useModal';
import { EnOrderType } from '@/types/sales';
import { useState } from 'react';
import CsvLink from '../csvLink/CsvLink';
import Body from './body/Body';
import Header from './header/Header';
import styles from './styles/csvModal.module.css';
const CsvModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const clickHiddenModal = () => MagicModal.hide(modalId ?? '');
  const [orderType, setOrderType] = useState<EnOrderType>('store');
  return (
    <div className={styles.container}>
      <Header clickHiddenModal={clickHiddenModal} />
      <Body order_type={orderType} setOrderType={setOrderType} />
      <CsvLink order_type={orderType} clickHiddenModal={clickHiddenModal}>
        다운로드
      </CsvLink>
    </div>
  );
};

export default CsvModal;
