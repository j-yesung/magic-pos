import styles from './styles/ReceiptPrice.module.css';
import { MenuItemWithOption } from '@/types/supabase';
import { getTotalPrice } from '@/shared/store/kiosk';
import { convertNumberToWon } from '@/shared/helper';
import { useTranslation } from 'react-i18next';

const ReceiptPrice = ({ itemList }: { itemList: MenuItemWithOption[] }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <span>{t('total-order-price')}</span>
      <span>{convertNumberToWon(getTotalPrice(itemList))}</span>
    </div>
  );
};

export default ReceiptPrice;
