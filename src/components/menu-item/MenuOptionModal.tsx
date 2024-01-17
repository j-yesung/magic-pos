import MenuOptionModalButton from './MenuOptionModalButton';
import MenuOptionModalInput from './MenuOptionModalInput';
import styles from './styles/menu-option-modal.module.css';

const MenuOptionModal = ({ modalId }: { modalId?: string }) => {
  

  return (
    <div className={styles['wrap']}>
      <MenuOptionModalInput/>
      <MenuOptionModalButton modalId={modalId}/>
    </div>
  );
};

export default MenuOptionModal;
