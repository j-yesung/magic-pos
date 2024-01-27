import { useModal } from '@/hooks/service/ui/useModal';
import { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import styles from './styles/CartAlertModal.module.css';
import { useTranslation } from 'next-i18next';

const CartAlertModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      MagicModal.hide(modalId ?? '');
    }, 700);
  }, []);

  return (
    <div className={styles.container}>
      <FaCheck size={40} />
      <p>{t('modal.add-cart-success')}</p>
    </div>
  );
};

export default CartAlertModal;
