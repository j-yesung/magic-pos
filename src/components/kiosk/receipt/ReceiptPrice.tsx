import styles from './styles/ReceiptPrice.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { getTotalPrice } from '@/shared/store/kiosk';
import { convertNumberToWon } from '@/shared/helper';
import { useTranslation } from 'next-i18next';

const ReceiptPrice = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <span>{t('total-order-price')}</span>
      <span>{convertNumberToWon(getTotalPrice(itemList), i18n.language === 'ko')}</span>
    </div>
  );
};

export default ReceiptPrice;
