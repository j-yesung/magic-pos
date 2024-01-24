import styles from './styles/CartMoreButton.module.css';
import { HiOutlinePlus } from 'react-icons/hi2';
import { useTranslation } from 'react-i18next';

const CartMoreButton = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <HiOutlinePlus size={20} />
      <span>{t('add-more')}</span>
    </div>
  );
};

export default CartMoreButton;
