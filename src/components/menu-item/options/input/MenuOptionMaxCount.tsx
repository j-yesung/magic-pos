import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_OPTION } from '@/data/menu-item';
import useMenuOptionStore from '@/shared/store/menu/menu-option';
import clsx from 'clsx';
import { ChangeEvent } from 'react';

interface ChangeOptionType {
  changeMenuOptionHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}
const MenuOptionMaxCountComponent = ({ changeMenuOptionHandler }: ChangeOptionType) => {
  const menuOption = useMenuOptionStore(state => state.menuOption);

  return (
    <div>
      <div className={styles['max-count-wrap']}>
        <label className={styles['input-name']} htmlFor="name">
          {MENU_OPTION.MAX_DETAIL_COUNT}
        </label>
        <input
          type="number"
          name="max_detail_count"
          className={clsx(styles['input'], styles['max-count'])}
          value={menuOption.max_detail_count}
          placeholder={MENU_OPTION.MAX_DETAIL_COUNT}
          onChange={e => changeMenuOptionHandler(e)}
        />
      </div>
    </div>
  );
};

export default MenuOptionMaxCountComponent;
