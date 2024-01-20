import styles from '../styles/menu-option-modal.module.css';
import MenuOptionModalButton from './MenuOptionModalButton';
import MenuOptionModalInput from './MenuOptionModalInput';

const MenuOptionModal = ({ modalId }: { modalId?: string }) => {
  return (
    <div className={styles['wrap']}>
      <MenuOptionModalInput />
      <MenuOptionModalButton modalId={modalId} />
    </div>
  );
};

export default MenuOptionModal;
