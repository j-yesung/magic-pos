import styles from './styles/StepButton.module.css';
import useKioskState, { addOrderList, getTotalPrice, resetSelectedMenu } from '@/shared/store/kiosk';
import { MenuItemWithOption } from '@/types/supabase';
import { useModal } from '@/hooks/service/ui/useModal';
import CartAlertModal from '@/components/kiosk/cart/CartAlertModal';
import { convertNumberToWon } from '@/shared/helper';
import { BiSolidCircle } from 'react-icons/bi';
import { useTranslation } from 'next-i18next';

/**
 * 옵션, 수량 등을 정한 뒤 장바구니(orderList)에 담는다.
 * @param menu
 * @constructor
 */
const AddCartButton = ({ menu }: { menu: MenuItemWithOption | null }) => {
  const selectedMenu = useKioskState(state => state.selectedMenu);
  const optionSwiperRef = useKioskState(state => state.optionSwiperRef);
  const selectedOptions = useKioskState(state => state.selectedOptions);
  const amount = useKioskState(state => state.amount);
  const { t, i18n } = useTranslation();
  const { MagicModal } = useModal();

  const itemList: MenuItemWithOption[] = new Array(amount).fill(true).map(() => {
    const menu = { ...selectedMenu } as MenuItemWithOption;
    menu.menu_option = selectedOptions;
    return menu;
  });

  const totalPrice = getTotalPrice(itemList);

  /**
   * 주문 목록에 메뉴를 담는다.
   */
  const handleClickAddCart = () => {
    if (menu) {
      // 옵션 지정 여부에 따라 주문 확인에서는 다른 Row로 보여줘야 하므로 선택된 옵션 detail의 키를 조합하여 새로운 아이디를 만든다.
      const uniqueId =
        menu.id + selectedOptions.map(option => option.menu_option_detail.map(d => d.id).join('')).join('');
      addOrderList(
        new Array(amount).fill(false).map(() => ({ ...menu, menu_option: selectedOptions, unique: uniqueId })),
      );
    }
    optionSwiperRef?.current!.swiper.slidePrev();
    resetSelectedMenu();
    MagicModal.fire(<CartAlertModal />);
  };

  return (
    <button className={styles.button} onClick={handleClickAddCart}>
      <span>
        {convertNumberToWon(totalPrice, i18n.language === 'ko')} <BiSolidCircle size={2} /> {t('footer.add')}
      </span>
    </button>
  );
};

export default AddCartButton;
