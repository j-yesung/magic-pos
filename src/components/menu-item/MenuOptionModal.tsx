import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import { MenuOptionWithDetail, TablesUpdate } from '@/types/supabase';
import { Fragment, useState } from 'react';
import styles from './styles/menu-option-modal.module.css';

const MenuOptionModal = () => {
  const { MagicModal } = useModal();
  const {
    menuOption,
    setMenuOption,
    menuOptions,
    setMenuOptions,
    updateMenuOptionsStore,
    menuOptionDetailList,
    setMenuOptionDetailList,
    menuOptionIndex,
  } = useMenuItemStore();

  const defaultOptionDetail = {
    detailName: '',
    detailPrice: 0,
  };
  const [optionDetail, setOptionDetail] = useState(defaultOptionDetail);

  // 옵션 onchange handler
  const changeMenuOptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'is_use') {
      setMenuOption({ ...menuOption, is_use: !menuOption.is_use });
    } else {
      setMenuOption({ ...menuOption, [name]: value });
    }
  };

  // 옵션 디테일 onchange handler
  const changeMenuOptionItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOptionDetail({ ...optionDetail, [name]: value });
  };

  // 옵션 detail 추가
  const AddDetailHandler = async () => {
    //TODO: //if (optionDetail.detailName === '') return MagicModal.alert({ content: '최소 1글자는 입력해주세요' });
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

  // 옵션 수정
  const updateOptionDetailHandler = async (menuOption: TablesUpdate<'menu_option'>) => {
    if (menuOptionIndex === -1) {
      const newOptionDetail: MenuOptionWithDetail = {
        id: '',
        name: menuOption.name ?? '',
        is_use: menuOption.is_use ?? false,
        menu_id: menuOption.menu_id ?? '',
        menu_option_detail: menuOptionDetailList,
        max_detail_count: menuOption.max_detail_count ?? 1,
      };
      setMenuOptions([...menuOptions, newOptionDetail]);
    } else {
      updateMenuOptionsStore(prevMenuOptions =>
        prevMenuOptions.map((item, index) =>
          index === menuOptionIndex
            ? {
                ...item,
                name: menuOption.name ?? '',
                is_use: menuOption.is_use ?? false,
                menu_option_detail: menuOptionDetailList,
                max_detail_count: menuOption.max_detail_count ?? 1,
              }
            : item,
        ),
      );
    }
    MagicModal.destroy();
  };

  // 옵션 삭제
  const removeOptionDetailHandler = async () => {
    const removedItemList = menuOptions.filter((_, index) => index !== menuOptionIndex);
    setMenuOptions(removedItemList);
    MagicModal.destroy();
  };

  return (
    <div className={styles['wrap']}>
      <h3>옵션 상세 설정</h3>
      <div>
        <h5>옵션 이름</h5>
        <input
          type="text"
          name="name"
          placeholder="옵션이름"
          value={menuOption.name ?? ''}
          onChange={changeMenuOptionHandler}
        />
      </div>
      <div>
        <h5>옵션 항목</h5>
        <div>
          {menuOptionDetailList.map((option, index) => (
            <Fragment key={index}>
              <p>
                {option.id}
                <span style={{ display: 'flex' }}>{option.name}</span>
                <span style={{ display: 'flex' }}>{option.price}</span>
              </p>
              <button type="button" onClick={() => handleRemoveOptionDetail(option.id, index)}>
                항목 제거
              </button>
            </Fragment>
          ))}
        </div>
        <p>
          <input
            type="text"
            name="detailName"
            value={optionDetail.detailName}
            placeholder="옵션 이름"
            onChange={e => changeMenuOptionItemHandler(e)}
          />
          <input
            type="number"
            name="detailPrice"
            value={optionDetail.detailPrice}
            placeholder="옵션 가격"
            onChange={e => changeMenuOptionItemHandler(e)}
          />
        </p>
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

      <button onClick={() => MagicModal.destroy()}>닫기</button>
      <button onClick={removeOptionDetailHandler}>삭제</button>
      <button onClick={() => updateOptionDetailHandler(menuOption)}>수정</button>
    </div>
  );
};

export default MenuOptionModal;
