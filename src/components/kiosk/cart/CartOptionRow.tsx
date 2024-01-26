import { MenuItemWithOption } from '@/types/supabase';
import styles from './styles/CartOptionRow.module.css';
import { useGetOptionText } from '@/hooks/service/useKiosk';

const CartOptionRow = ({ menu }: { menu: MenuItemWithOption[] }) => {
  const { getOptionList } = useGetOptionText();

  return <span className={styles.optionText}>{getOptionList(menu)}</span>;
};

export default CartOptionRow;
