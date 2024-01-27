import { useEffect } from 'react';
import styles from './styles/Amount.module.css';
import useKioskState, { addAmount, resetAmount, subtractAmount } from '@/shared/store/kiosk';
import { FaMinus, FaPlus } from 'react-icons/fa6';
import { useTranslation } from 'next-i18next';

const Amount = () => {
  const amount = useKioskState(state => state.amount);
  const { t } = useTranslation();

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
        <button onClick={addAmount}>
          <FaPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Amount;
