import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_TOAST } from '@/data/menu-item';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import useMenuOptionStore, { setMenuOption, setMenuOptionDetailList } from '@/shared/store/menu/menu-option';
import React, { useEffect } from 'react';
import MenuOptionDetailWrapComponent from '../input/MenuOptionDetailWrap';
import MenuOptionIsUseComponent from '../input/MenuOptionIsUse';
import MenuOptionMaxCountComponent from '../input/MenuOptionMaxCount';
import MenuOptionNameComponent from '../input/MenuOptionName';

const MenuOptionModalInput = () => {
  const { showCompleteToast } = useMenuToast();

  const menuOption = useMenuOptionStore(state => state.menuOption);
  const menuOptionDetail = useMenuOptionStore(state => state.menuOptionDetail);
  const menuOptionDetailList = useMenuOptionStore(state => state.menuOptionDetailList);
  const menuOptionIndex = useMenuOptionStore(state => state.menuOptionIndex);

  useEffect(() => {
    if (menuOptionIndex === -1) addOptionDetailInputHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 옵션 디테일추가
  const addOptionDetailInputHandler = () => {
    if (menuOptionDetailList.length > 4) {
      showCompleteToast(MENU_TOAST.OPTION_ADD_DETAIL_BUTTON_ALERT, 'warn');
      return;
    }
    setMenuOptionDetailList([...menuOptionDetailList, { ...menuOptionDetail, price: '' }]);
  };

  // 옵션 onchange handler
  const changeMenuOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name === 'is_use') {
      setMenuOption({ ...menuOption, is_use: !menuOption.is_use });
    } else {
      if (type === 'number') {
        const newValue = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setMenuOption({ ...menuOption, [name]: newValue });
      } else {
        setMenuOption({ ...menuOption, [name]: value });
      }
    }
  };

  return (
    <div className={styles['wrap']}>
      <MenuOptionNameComponent changeMenuOptionHandler={changeMenuOptionHandler} />
      <MenuOptionDetailWrapComponent addOptionDetailInputHandler={addOptionDetailInputHandler} />
      <MenuOptionMaxCountComponent changeMenuOptionHandler={changeMenuOptionHandler} />
      <MenuOptionIsUseComponent changeMenuOptionHandler={changeMenuOptionHandler} />
    </div>
  );
};

export default MenuOptionModalInput;
