import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_OPTION } from '@/data/menu-item';
import useMenuOptionStore from '@/shared/store/menu/menu-option';
import { ChangeEvent } from 'react';

interface ChangeOptionType {
  changeMenuOptionHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
const MenuOptionNameComponent = ({ changeMenuOptionHandler }: ChangeOptionType) => {
  const menuOption = useMenuOptionStore(state => state.menuOption);

  return (
    <p className={styles['input-wrap']}>
      <label className={styles['input-name']} htmlFor="name">
        {MENU_OPTION.NAME_LABEL}
      </label>
      <input
        type="text"
        id="name"
        name="name"
        className={styles['input']}
        placeholder={MENU_OPTION.NAME_PLACEHOLDER}
        value={menuOption.name ?? ''}
        onChange={changeMenuOptionHandler}
        minLength={1}
        maxLength={20}
      />
    </p>
  );
};

export default MenuOptionNameComponent;
