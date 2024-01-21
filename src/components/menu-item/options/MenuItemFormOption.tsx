import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import { MenuOptionWithDetail } from '@/types/supabase';
import { FiAlertCircle } from 'react-icons/fi';
import MenuOptionModal from '../options/MenuOptionModal';
import styles from '../styles/menu-item-form.module.css';
import CloseButton from '/public/icons/close.svg';
import EditButton from '/public/icons/pencil.svg';
import PlusButton from '/public/icons/plus.svg';

const MenuItemFormOption = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const {
    menuItem,
    menuOption,
    setMenuOption,
    menuOptions,
    setMenuOptions,
    setMenuOptionDetailList,
    menuOptionIndex,
    setMenuOptionIndex,
  } = useMenuItemStore();
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

  // 옵션 삭제
  const removeOptionDetailHandler = async () => {
    MagicModal.confirm({
      icon: <FiAlertCircle size={50} />,
      content: '옵션을 삭제하시겠습니까?',
      confirmButtonCallback: () => {
        const removedItemList = menuOptions.filter((_, index) => index !== menuOptionIndex);
        setMenuOptions(removedItemList);
      },
    });
  };

  return (
    <div className={styles['option-container']}>
      <span className={styles['input-name']}>옵션 설정</span>
      {menuOptions ? (
        <div className={styles['option-wrap']}>
          {menuOptions.map((item, index) => (
            <button type="button" key={index}>
              {item.name}
              <span className={styles['mini-edit-btn']} onClick={() => clickUpdateOptionHandler(item, index)}>
                <EditButton width={16} height={16} />
              </span>
              <span className={styles['mini-remove-btn']} onClick={() => removeOptionDetailHandler()}>
                <CloseButton width={12} height={12} />
              </span>
            </button>
          ))}
          <button type="button" onClick={clickAddOptionHandler}>
            <PlusButton width={13} height={13} />
          </button>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default MenuItemFormOption;
