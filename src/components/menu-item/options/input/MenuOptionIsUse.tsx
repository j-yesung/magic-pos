import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_OPTION } from '@/data/menu-item';
import useMenuOptionStore from '@/shared/store/menu/menu-option';
import clsx from 'clsx';
import { ChangeEvent } from 'react';
import { FaCheck } from 'react-icons/fa6';

interface ChangeOptionType {
  changeMenuOptionHandler: (e: ChangeEvent<HTMLInputElement>) => void;
}

const MenuOptionIsUseComponent = ({ changeMenuOptionHandler }: ChangeOptionType) => {
  const menuOption = useMenuOptionStore(state => state.menuOption);

  return (
    <div>
      <div className={styles['checkbox-wrap']}>
        <p>
          <label
            className={clsx(styles['checkbox-label'], {
              [styles.active]: menuOption.is_use,
            })}
            htmlFor="is_use"
          >
            <FaCheck size={14} />
          </label>
          <input
            type="checkbox"
            id="is_use"
            name="is_use"
            checked={menuOption.is_use ?? false}
            onChange={changeMenuOptionHandler}
          />
        </p>
        <label className={styles['checkbox-info']} htmlFor="is_use">
          {MENU_OPTION.IS_USE}
        </label>
      </div>
    </div>
  );
};

export default MenuOptionIsUseComponent;
