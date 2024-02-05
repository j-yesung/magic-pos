import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_OPTION } from '@/data/menu-item';
import MenuOptionDetailComponent from './MenuOptionDetail';
import PlusButton from '/public/icons/plus.svg';

interface AddOptionDetailType {
  addOptionDetailInputHandler: () => void;
}

const MenuOptionDetailWrapComponent = ({ addOptionDetailInputHandler }: AddOptionDetailType) => {
  return (
    <div className={styles['option-detail-wrap']}>
      <div className={styles['top']}>
        <p className={styles['input-name']}>{MENU_OPTION.DETAIL_LABEL}</p>
        <button className={styles['plus-btn']} onClick={addOptionDetailInputHandler}>
          <span className={styles['img']}>
            <PlusButton width={14} height={14} />
          </span>
          <span className={styles['txt']}>{MENU_OPTION.DETAIL_BUTTON}</span>
        </button>
      </div>
      <MenuOptionDetailComponent />
    </div>
  );
};

export default MenuOptionDetailWrapComponent;
