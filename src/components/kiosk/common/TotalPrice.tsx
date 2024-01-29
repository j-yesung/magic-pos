import styles from './style/TotalPrice.module.css';
import { convertNumberToWon } from '@/shared/helper';
import { MenuItemWithOption } from '@/types/supabase';
import { getTotalPrice } from '@/shared/store/kiosk';
import { useTranslation } from 'next-i18next';

const TotalPrice = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const { t, i18n } = useTranslation();

  return (
    <div className={styles.container}>
      <span>{t('total-price')}</span>
      <span className={styles.totalPrice}>{convertNumberToWon(getTotalPrice(itemList), i18n.language === 'ko')}</span>
    </div>
  );
};

export default TotalPrice;
