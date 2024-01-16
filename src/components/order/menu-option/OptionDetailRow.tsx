import React, { useEffect } from 'react';
import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import useOrderStore from '@/shared/store/order';
import useToast from '@/hooks/toast/useToast';

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
