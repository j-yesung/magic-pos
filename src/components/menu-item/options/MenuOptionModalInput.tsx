import useMenuToast from '@/hooks/service/menu/useMenuToast';
import { MENU_OPTION, MENU_TOAST } from '@/hooks/service/menu/useText';
import useMenuOptionStore, {
  NewOptionDetailType,
  setMenuOption,
  setMenuOptionDetailList,
} from '@/shared/store/menu/menu-option';
import clsx from 'clsx';
import React, { useEffect } from 'react';
import { FaCheck } from 'react-icons/fa6';
import styles from '../styles/menu-option-modal.module.css';
import PlusButton from '/public/icons/plus.svg';

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

  // 옵션 디테일 onchange handler
  const changeMenuOptionItemHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const inputItemsCopy: NewOptionDetailType[] = [...menuOptionDetailList];
    const { value, name } = e.target;

    if (name === 'detailName') inputItemsCopy[index].name = value;
    else if (name === 'detailPrice') {
      const newValue = value.replace(/[^0-9e]/gi, '');
      if (newValue.includes('e')) return;
      inputItemsCopy[index].price = newValue;
    }
    setMenuOptionDetailList(inputItemsCopy);
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

  // 옵션 detail 삭제
  const removeOptionDetailhandler = async (optionDetailIndex: number) => {
    const removedItemList = menuOptionDetailList.filter((_, index) => index !== optionDetailIndex);
    setMenuOptionDetailList(removedItemList);
  };

  return (
    <div className={styles['wrap']}>
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
        <div className={styles['option-three-wrap']}>
          {menuOptionDetailList.map((item, index) => (
            <div key={index} className={styles['input-wrap']}>
              <input
                name="detailName"
                type="text"
                className={styles['input']}
                onChange={e => changeMenuOptionItemHandler(e, index)}
                value={item.name}
                placeholder={MENU_OPTION.DETAIL_NAME_PLACEHOLDER}
              />
              <input
                name="detailPrice"
                type="text"
                className={styles['input']}
                onChange={e => changeMenuOptionItemHandler(e, index)}
                value={item.price}
                placeholder={MENU_OPTION.DETAIL_PRICE_PLACEHOLDER}
              />
              <button onClick={() => removeOptionDetailhandler(index)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
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
      <div>
        <div></div>
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
    </div>
  );
};

export default MenuOptionModalInput;
