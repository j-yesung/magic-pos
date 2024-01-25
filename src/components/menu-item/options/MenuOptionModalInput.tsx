import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import clsx from 'clsx';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa6';
import styles from '../styles/menu-option-modal.module.css';
import PlusButton from '/public/icons/plus.svg';

const MenuOptionModalInput = () => {
  const { MagicModal } = useModal();
  const { menuOption, setMenuOption, menuOptionDetailList, setMenuOptionDetailList } = useMenuItemStore();

  const defaultOptionDetail = {
    detailName: '',
    detailPrice: 0,
  };
  const [optionDetail, setOptionDetail] = useState(defaultOptionDetail);

  // 옵션 onchange handler
  const changeMenuOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (name === 'is_use') {
      setMenuOption({ ...menuOption, is_use: !menuOption.is_use });
    } else {
      if (type === 'number') {
        const newValue = value.replace(/[^0-9]/g, '');
        setMenuOption({ ...menuOption, [name]: newValue });
      } else {
        setMenuOption({ ...menuOption, [name]: value });
      }
    }
  };

  // 옵션 디테일 onchange handler
  const changeMenuOptionItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      const newValue = value.replace(/[^0-9]/g, '');
      setOptionDetail({ ...optionDetail, [name]: newValue });
    } else {
      setOptionDetail({ ...optionDetail, [name]: value });
    }
  };

  // 옵션 detail 추가
  const AddDetailHandler = async () => {
    if (optionDetail.detailName === '') return MagicModal.alert({ content: '최소 1글자는 입력해주세요' });
    const addOptionForm = {
      id: '',
      name: optionDetail.detailName,
      option_id: menuOption.id,
      price: optionDetail.detailPrice,
    };
    setMenuOptionDetailList([...menuOptionDetailList, { ...addOptionForm }]);
    setOptionDetail({
      ...optionDetail,
      detailName: '',
      detailPrice: 0,
    });
  };

  // 옵션 detail 삭제
  const handleRemoveOptionDetail = async (optionDetailId: string, optionDetailIndex: number) => {
    const removedItemList = menuOptionDetailList.filter((_, index) => index !== optionDetailIndex);
    setMenuOptionDetailList(removedItemList);
  };

  return (
    <div className={styles['wrap']}>
      <div>
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
      </div>
      <div>
        <p className={styles['input-name']}>옵션 추가</p>
        <div className={styles['option-three-wrap']}>
          <p className={styles['input-wrap']}>
            <input
              type="text"
              id="detailName"
              name="detailName"
              className={styles['input']}
              value={optionDetail.detailName}
              placeholder="옵션 내용을 입력하세요."
              onChange={e => changeMenuOptionItemHandler(e)}
            />
          </p>
          <p className={styles['input-wrap']}>
            <input
              type="number"
              id="detailPrice"
              name="detailPrice"
              className={styles['input']}
              value={optionDetail.detailPrice}
              placeholder="옵션 가격을 입력하세요."
              onChange={e => changeMenuOptionItemHandler(e)}
            />
          </p>
          <p>
            <button type="button" onClick={AddDetailHandler}>
              <PlusButton width={25} height={25} />
            </button>
          </p>
        </div>
        <div className={styles['line']}></div>
        <div className={styles['option-list-wrap']}>
          {menuOptionDetailList.map((option, index) => (
            <div key={index} className={styles['option-three-wrap']}>
              <p className={styles['option-list']}>{option.name}</p>
              <p className={styles['option-list']}>{option.price}</p>
              <p>
                <button
                  className={styles['option-btn']}
                  type="button"
                  onClick={() => handleRemoveOptionDetail(option.id, index)}
                >
                  삭제
                </button>
              </p>
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
