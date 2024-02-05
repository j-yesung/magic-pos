import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_OPTION } from '@/data/menu-item';
import useMenuOptionStore, { NewOptionDetailType, setMenuOptionDetailList } from '@/shared/store/menu/menu-option';

const MenuOptionDetailComponent = () => {
  const menuOptionDetailList = useMenuOptionStore(state => state.menuOptionDetailList);

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

  // 옵션 detail 삭제
  const removeOptionDetailhandler = async (optionDetailIndex: number) => {
    const removedItemList = menuOptionDetailList.filter((_, index) => index !== optionDetailIndex);
    setMenuOptionDetailList(removedItemList);
  };

  return (
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
  );
};

export default MenuOptionDetailComponent;
