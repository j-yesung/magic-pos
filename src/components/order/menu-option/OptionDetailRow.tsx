import React from 'react';
import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';
import useToast from '@/hooks/toast/useToast';

/**
 * -- 로직 설명
 * 선택할 디테일 옵션을 추가한다. selectedDetail은 option에서 정해진 개수를 넘을 수 없다.
 * addSelectedOption을 통해 선택된 옵션을 저장해놓는다. (orderList에 바로 반영 X)
 * 장바구니 담기시 selectedOption이 orderList에 같이 담긴다.
 * @param option
 * @param detail
 * @param selectedDetail
 * @param setSelectedDetail
 * @constructor
 */
const OptionDetailRow = ({
  option,
  detail,
  selectedDetail,
  setSelectedDetail,
}: {
  option: MenuOptionWithDetail;
  detail: Tables<'menu_option_detail'>;
  selectedDetail: Tables<'menu_option_detail'>[];
  setSelectedDetail: React.Dispatch<React.SetStateAction<Tables<'menu_option_detail'>[]>>;
}) => {
  const { addSelectedOption } = useOrderStore();
  const { toast } = useToast();

  const onClickCheckOption = () => {
    // 지정된 개수를 초과하면 무시
    if (selectedDetail.length >= option.max_detail_count) {
      toast(`해당 옵션은 ${option.max_detail_count}개 이상 선택할 수 없습니다.`, {
        type: 'danger',
        position: 'top-right',
        autoClose: 1500,
        showCloseButton: false,
      });
      return;
    }

    const newSelectedDetail = [...selectedDetail, detail];
    setSelectedDetail(newSelectedDetail);
    addSelectedOption({ ...option, menu_option_detail: newSelectedDetail });
  };

  return (
    <div>
      <input type="checkbox" onClick={onClickCheckOption} />
      <span>{detail.name}</span>
    </div>
  );
};

export default OptionDetailRow;
