import React from 'react';
import styles from './styles/StepButton.module.css';
import useOrderStore from '@/shared/store/order';
import { MenuItemWithOption } from '@/types/supabase';
import { SLIDE_MOVE_SPEED } from '@/components/layout/order/footer/StepButton';

/**
 * 옵션, 수량 등을 정한 뒤 장바구니(orderList)에 담는다.
 * @param menu
 * @constructor
 */
const AddCartButton = ({ menu }: { menu: MenuItemWithOption | null }) => {
  const { addOrderList, optionSwiperRef, selectedOptions, resetSelectedOptions, setSelectedMenu, amount, resetAmount } =
    useOrderStore();

  /**
   * 주문 목록에 메뉴를 담는다.
   */
  const handleClickAddCart = () => {
    if (menu) {
      // 옵션 지정 여부에 따라 주문 확인에서는 다른 Row로 보여줘야 하므로 선택된 옵션 detail의 키를 조합하여 새로운 아이디를 만든다.
      const uniqueId = selectedOptions.map(option => option.menu_option_detail.map(d => d.id).join('')).join('');
      addOrderList(
        new Array(amount).fill(false).map(() => ({ ...menu, menu_option: selectedOptions, unique: uniqueId })),
      );
    }
    optionSwiperRef?.current!.swiper.slidePrev(SLIDE_MOVE_SPEED);
    resetSelectedOptions();
    setSelectedMenu(null);
    resetAmount();
  };

  return (
    <button className={styles.button} onClick={handleClickAddCart}>
      담기
    </button>
  );
};

export default AddCartButton;
