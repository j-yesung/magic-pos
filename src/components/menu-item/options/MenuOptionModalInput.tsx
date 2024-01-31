import useToast from '@/hooks/service/ui/useToast';
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
  const { toast } = useToast();

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
      toast('옵션 항목은 최대 5개입니다.', {
        type: 'warn',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
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
          옵션명
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className={styles['input']}
          placeholder="옵션이름"
          value={menuOption.name ?? ''}
          onChange={changeMenuOptionHandler}
          minLength={1}
          maxLength={20}
        />
      </p>
      <div className={styles['option-detail-wrap']}>
        <div className={styles['top']}>
          <p className={styles['input-name']}>옵션 추가</p>
          <button className={styles['plus-btn']} onClick={addOptionDetailInputHandler}>
            <span className={styles['img']}>
              <PlusButton width={14} height={14} />
            </span>
            <span className={styles['txt']}>항목 추가하기</span>
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
                placeholder="옵션 내용"
              />
              <input
                name="detailPrice"
                type="text"
                className={styles['input']}
                onChange={e => changeMenuOptionItemHandler(e, index)}
                value={item.price}
                placeholder="옵션 가격"
              />
              <button onClick={() => removeOptionDetailhandler(index)}>삭제</button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <div className={styles['max-count-wrap']}>
          <label className={styles['input-name']} htmlFor="name">
            옵션 최대 선택 갯수
          </label>
          <input
            type="number"
            name="max_detail_count"
            className={clsx(styles['input'], styles['max-count'])}
            value={menuOption.max_detail_count}
            placeholder="옵션 최대 선택 갯수"
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
            이 옵션을 노출합니다.{' '}
          </label>
        </div>
      </div>
    </div>
  );
};

export default MenuOptionModalInput;
