import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import React, { useState } from 'react';
import styles from './styles/menu-option-modal.module.css';

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
        if (newValue) setMenuOption({ ...menuOption, [name]: value });
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
      if (newValue) setOptionDetail({ ...optionDetail, [name]: value });
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
    <>
      <h3>옵션 상세 설정</h3>
      <div>
        <p className={styles['input-wrap']}>
          <label className={styles['input-name']} htmlFor="name">
            옵션 이름
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles['input']}
            placeholder="옵션이름"
            value={menuOption.name ?? ''}
            onChange={changeMenuOptionHandler}
          />
        </p>
      </div>
      <div>
        <h5>옵션 항목</h5>
        <div className={styles['option-wrap']}>
          {menuOptionDetailList.map((option, index) => (
            <div key={index}>
              <p className={styles['option-list']}>
                <span className={styles['option-sub-name']}>{option.name}</span>
                <span className={styles['option-sub-price']}>{option.price}</span>
              </p>
              <button
                className={styles['option-btn']}
                type="button"
                onClick={() => handleRemoveOptionDetail(option.id, index)}
              >
                제거
              </button>
            </div>
          ))}
        </div>
        <div>
          <p className={styles['input-wrap']}>
            <label className={styles['input-name']} htmlFor="detailName">
              옵션 내용
            </label>
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
            <label className={styles['input-name']} htmlFor="detailPrice">
              옵션 가격
            </label>
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
        </div>
        <button type="button" onClick={AddDetailHandler}>
          <span>+</span>
          <span>항목 추가하기</span>
        </button>
      </div>
      <div>
        <h5>옵션 최대 선택 갯수</h5>
        <div>
          <input
            type="number"
            name="max_detail_count"
            className={styles['input']}
            value={menuOption.max_detail_count}
            placeholder="옵션 최대 선택 갯수"
            onChange={e => changeMenuOptionHandler(e)}
          />
        </div>
      </div>
      <div>
        <h5>활성화 유무</h5>
        <p>옵션을 보여줄지 설정할 수 있어요</p>
        <div>
          <input
            type="checkbox"
            id="is_use"
            name="is_use"
            checked={menuOption.is_use ?? false}
            onChange={changeMenuOptionHandler}
          />
        </div>
      </div>
    </>
  );
};

export default MenuOptionModalInput;
