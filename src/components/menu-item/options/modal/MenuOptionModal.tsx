import styles from '@/components/menu-item/styles/modal.module.css';
import { MENU_TITLE } from '@/data/menu-item';
import { useModal } from '@/hooks/service/ui/useModal';
import MenuOptionModalButton from '../form/MenuOptionModalButton';
import MenuOptionModalInput from '../form/MenuOptionModalInput';
import CloseButton from '/public/icons/close.svg';

const MenuOptionModal = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();

  const clickItemModalHide = () => {
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['menu-option-modal-wrap']}>
      <div className={styles['menu-modal-top']}>
        <h3 className={styles['title']}>{MENU_TITLE.OPTION_ADD}</h3>

        <div className={styles['close-button']}>
          <CloseButton width={26} height={26} onClick={clickItemModalHide} />
        </div>
      </div>

      <div className={styles['line']}></div>
      <div className={styles['box']}>
        <MenuOptionModalInput />
        <MenuOptionModalButton modalId={modalId} />
      </div>
    </div>
  );
};

export default MenuOptionModal;
