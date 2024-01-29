import { MenuOptionWithDetail, Tables } from '@/types/supabase';
import { addSelectedOption, subtractSelectedOption } from '@/shared/store/kiosk';
import useToast from '@/hooks/service/ui/useToast';
import { convertNumberToWon } from '@/shared/helper';
import styles from './styles/OptionDetailRow.module.css';
import Checkbox from '@/components/common/Checkbox';
import { useTranslation } from 'next-i18next';

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
  const { toast } = useToast();
  const { i18n } = useTranslation();

  const onClickCheckOption = (e: React.MouseEvent<HTMLInputElement>) => {
    const checked = e.currentTarget.checked;

    // 지정된 개수를 초과하면 무시
    if (selectedDetail.length >= option.max_detail_count && checked) {
      e.preventDefault();
      toast(`해당 옵션은 ${option.max_detail_count}개 이상 선택할 수 없습니다.`, {
        type: 'danger',
        position: 'top-right',
        autoClose: 1500,
        showCloseButton: false,
      });
      return;
    }
    if (!checked) {
      setSelectedDetail(prev => prev.filter(p => p.id !== detail.id));
      subtractSelectedOption(detail.id);
    } else {
      const newSelectedDetail = [...selectedDetail, detail];
      setSelectedDetail(newSelectedDetail);
      addSelectedOption({ ...option, menu_option_detail: newSelectedDetail });
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <Checkbox onClick={onClickCheckOption} />
        <span>{detail.name}</span>
      </div>
      <div>
        <span>{convertNumberToWon(detail.price, i18n.language === 'ko')}</span>
      </div>
    </div>
  );
};

export default OptionDetailRow;
