import styles from '@/components/menu-item/styles/menu-item-form.module.css';
import { MENU_ITEM, MENU_TOAST } from '@/data/menu-item';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuItemStore from '@/shared/store/menu/menu-item';
import useMenuOptionStore, {
  NewMenuOptionWithDetail,
  setMenuOption,
  setMenuOptionDetailList,
  setMenuOptionIndex,
  setMenuOptions,
} from '@/shared/store/menu/menu-option';
import { MenuOptionWithDetail } from '@/types/supabase';
import MenuOptionModal from '../modal/MenuOptionModal';
import CloseButton from '/public/icons/close.svg';
import ExclamationMark from '/public/icons/exclamation-mark.svg';
import EditButton from '/public/icons/pencil.svg';
import PlusButton from '/public/icons/plus.svg';

const MenuItemFormOption = () => {
  const { MagicModal } = useModal();
  const { showCompleteToast } = useMenuToast();
  const menuItem = useMenuItemStore(state => state.menuItem);
  const menuOptions = useMenuOptionStore(state => state.menuOptions);

  // 옵션 수정
  const clickUpdateOptionHandler = (item: NewMenuOptionWithDetail, index: number) => {
    setMenuOptionDetailList(item.menu_option_detail);
    setMenuOption(menuOptions[index]);
    setMenuOptionIndex(index);
    MagicModal.fire(<MenuOptionModal />);
  };

  // 옵션 추가
  const clickAddOptionHandler = async () => {
    const newOption: MenuOptionWithDetail = {
      id: '',
      is_use: true,
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
  const removeOptionDetailHandler = async (menuOptionIndex: number) => {
    setMenuOptionIndex(menuOptionIndex);
    MagicModal.confirm({
      icon: <ExclamationMark width={50} height={50} />,
      content: MENU_TOAST.OPTION_REMOVE_ALERT,
      confirmButtonCallback: () => {
        const removedItemList = menuOptions.filter((_, index) => index !== menuOptionIndex);
        setMenuOptions(removedItemList);
        showCompleteToast(MENU_TOAST.OPTION_REMOVE, 'success');
      },
    });
  };

  return (
    <div className={styles['option-container']}>
      <span className={styles['input-name']}>{MENU_ITEM.OPTION_LABEL}</span>
      {menuOptions && (
        <div className={styles['option-wrap']}>
          {menuOptions.map((item, index) => (
            <button type="button" key={index}>
              {item.name}
              <span className={styles['mini-edit-btn']} onClick={() => clickUpdateOptionHandler(item, index)}>
                <EditButton width={16} height={16} />
              </span>
              <span className={styles['mini-remove-btn']} onClick={() => removeOptionDetailHandler(index)}>
                <CloseButton width={12} height={12} />
              </span>
            </button>
          ))}
          <button type="button" className={styles['mini-plus-btn']} onClick={clickAddOptionHandler}>
            <PlusButton width={13} height={13} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MenuItemFormOption;
