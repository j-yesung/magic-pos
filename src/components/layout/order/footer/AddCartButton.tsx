import React from 'react';
import styles from './styles/StepButton.module.css';
import useOrderStore, { addOrderList, resetSelectedMenu } from '@/shared/store/order';
import { MenuItemWithOption } from '@/types/supabase';
import { useModal } from '@/hooks/modal/useModal';
import CartAlertModal from '@/components/order/cart/CartAlertModal';

/**
 * 옵션, 수량 등을 정한 뒤 장바구니(orderList)에 담는다.
 * @param menu
 * @constructor
 */
const AddCartButton = ({ menu }: { menu: MenuItemWithOption | null }) => {
  const optionSwiperRef = useOrderStore(state => state.optionSwiperRef);
  const selectedOptions = useOrderStore(state => state.selectedOptions);
  const amount = useOrderStore(state => state.amount);
  const { MagicModal } = useModal();

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
      <span>담기</span>
    </button>
  );
};

export default AddCartButton;
