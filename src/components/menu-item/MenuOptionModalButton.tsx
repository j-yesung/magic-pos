import { useModal } from '@/hooks/modal/useModal';
import useMenuItemStore from '@/shared/store/menu-item';
import { MenuOptionWithDetail, TablesUpdate } from '@/types/supabase';
import styles from './styles/menu-option-modal.module.css';

const MenuOptionModalButton = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();

  const { menuOption, menuOptions, setMenuOptions, updateMenuOptionsStore, menuOptionDetailList, menuOptionIndex } =
    useMenuItemStore();

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
    MagicModal.hide(modalId ?? '');
  };

  // 옵션 삭제
  const removeOptionDetailHandler = async () => {
    const removedItemList = menuOptions.filter((_, index) => index !== menuOptionIndex);
    setMenuOptions(removedItemList);
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['update-btn']} onClick={() => updateOptionDetailHandler(menuOption)}>
        확인
      </button>
      <button className={styles['delete-btn']} onClick={removeOptionDetailHandler}>
        삭제
      </button>
      <button className={styles['btn-wrap']} onClick={() => MagicModal.hide(modalId ?? '')}>
        닫기
      </button>
    </div>
  );
};

export default MenuOptionModalButton;
