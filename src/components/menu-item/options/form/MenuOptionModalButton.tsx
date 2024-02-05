import styles from '@/components/menu-item/styles/menu-option-modal.module.css';
import { MENU_CONFIRM, MENU_TOAST } from '@/data/menu-item';
import useMenuToast from '@/hooks/service/menu/useMenuToast';
import { useModal } from '@/hooks/service/ui/useModal';
import useMenuOptionStore, {
  NewMenuOptionWithDetail,
  setMenuOptions,
  updateMenuOptionsStore,
} from '@/shared/store/menu/menu-option';
import { TablesUpdate } from '@/types/supabase';

const MenuOptionModalButton = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { showCompleteToast } = useMenuToast();
  const menuOption = useMenuOptionStore(state => state.menuOption);
  const menuOptions = useMenuOptionStore(state => state.menuOptions);
  const menuOptionDetailList = useMenuOptionStore(state => state.menuOptionDetailList);
  const menuOptionIndex = useMenuOptionStore(state => state.menuOptionIndex);

  // 옵션 수정
  const updateOptionDetailHandler = async (menuOption: TablesUpdate<'menu_option'>) => {
    if (menuOption.name === '') {
      showCompleteToast(MENU_TOAST.OPTION_ADD_NAME_ALERT, 'warn');
      return;
    }

    //  옵션 디테일 내용 없는거 필터링
    const emptyOptionDetailName = menuOptionDetailList.filter(item => item.name === '');
    const emptyOptionDetailPrice = menuOptionDetailList.filter(item => item.price === '');
    if (emptyOptionDetailName.length > 0 || emptyOptionDetailPrice.length > 0) {
      showCompleteToast(MENU_TOAST.OPTION_ADD_DETAIL_ALERT, 'warn');
      return;
    }

    if (menuOptionIndex === -1) {
      const newOptionDetail: NewMenuOptionWithDetail = {
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
    showCompleteToast(MENU_TOAST.OPTION_ADD, 'success');
    MagicModal.hide(modalId ?? '');
  };

  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['basic-btn']} onClick={() => MagicModal.hide(modalId ?? '')}>
        {MENU_CONFIRM.CANCEL}
      </button>
      <button className={styles['update-btn']} onClick={() => updateOptionDetailHandler(menuOption)}>
        {MENU_CONFIRM.CHECK}
      </button>
    </div>
  );
};

export default MenuOptionModalButton;
