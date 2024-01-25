import { useModal } from '@/hooks/service/ui/useModal';
import useToast from '@/hooks/service/ui/useToast';
import useMenuItemStore from '@/shared/store/menu-item';
import { MenuOptionWithDetail, TablesUpdate } from '@/types/supabase';
import styles from '../styles/menu-option-modal.module.css';

const MenuOptionModalButton = ({ modalId }: { modalId?: string }) => {
  const { MagicModal } = useModal();
  const { toast } = useToast();

  const { menuOption, menuOptions, setMenuOptions, updateMenuOptionsStore, menuOptionDetailList, menuOptionIndex } =
    useMenuItemStore();

  // 옵션 수정
  const updateOptionDetailHandler = async (menuOption: TablesUpdate<'menu_option'>) => {
    if (menuOption.name === '') {
      toast('옵션명은 필수입니다.', {
        type: 'warn',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 2000,
      });
      return;
    }

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

  return (
    <div className={styles['btn-wrap']}>
      <button className={styles['basic-btn']} onClick={() => MagicModal.hide(modalId ?? '')}>
        취소
      </button>
      <button className={styles['update-btn']} onClick={() => updateOptionDetailHandler(menuOption)}>
        확인
      </button>
    </div>
  );
};

export default MenuOptionModalButton;
