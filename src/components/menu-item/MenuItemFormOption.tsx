import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import { MenuOptionWithDetail } from '@/types/supabase';
import MenuOptionModal from './MenuOptionModal';
import styles from './styles/menu-item-form.module.css';

const MenuItemFormOption = () => {
  const { MagicModal } = useModal();

  // 옵션 수정
  const clickUpdateOptionHandler = (item: MenuOptionWithDetail, index: number) => {
    setMenuOptionDetailList(item.menu_option_detail);
    setMenuOption({
      ...menuOption,
      name: menuOptions[index].name,
      is_use: menuOptions[index].is_use,
      max_detail_count: menuOptions[index].max_detail_count,
      id: menuOptions[index].id,
    });
    setMenuOptionIndex(index);
    MagicModal.fire(<MenuOptionModal />);
  };

  
  // 옵션 추가
  const clickAddOptionHandler = async () => {
    const newOption: MenuOptionWithDetail = {
      id: '',
      is_use: false,
      menu_id: menuItem.id,
      name: '',
      menu_option_detail: [],
      max_detail_count: 1,
    };
    setMenuOptionDetailList([]);
    setMenuOption(newOption);
    setMenuOptionIndex(-1);
    MagicModal.fire(<MenuOptionModal />);
  };
  
  const {
    menuItem,
    menuOption,
    setMenuOption,
    menuOptions,
    setMenuOptionDetailList,
    setMenuOptionIndex,
  } = useMenuItemStore();
  return (
    <>
      {menuOptions ? (
        <div className={styles['option-wrap']}>
          {menuOptions.map((item, index) => (
            <button type="button" key={index} onClick={() => clickUpdateOptionHandler(item, index)}>
              {item.name}
            </button>
          ))}
          <button type="button" onClick={clickAddOptionHandler}>
            +
          </button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default MenuItemFormOption