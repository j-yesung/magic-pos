import { useEffect } from 'react';
import styles from './styles/Amount.module.css';
import useKioskState, { addAmount, resetAmount, subtractAmount } from '@/shared/store/kiosk';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useTranslation } from 'next-i18next';
import useToast from '@/hooks/service/ui/useToast';

const Amount = () => {
  const amount = useKioskState(state => state.amount);
  const maxAmount = useKioskState(state => state.maxAmount);
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleAddAmount = () => {
    if (amount >= maxAmount) {
      toast('해당 메뉴의 재고보다 많이 담을 수 없습니다.', {
        type: 'warn',
        position: 'bottom-right',
        autoClose: 1500,
      });
      return;
    }
    addAmount();
  };

  useEffect(() => {
    return () => {
      resetAmount();
    };
  }, []);

  return (
    <div className={styles.container}>
      <span>{t('amount')}</span>
      <div className={styles.buttonWrapper}>
        <button onClick={subtractAmount}>
          <FaMinus size={20} />
        </button>
        <span>{amount}</span>
        <button onClick={handleAddAmount}>
          <FaPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Amount;
