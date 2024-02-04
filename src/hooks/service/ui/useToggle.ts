import { MANAGEMENT_PATH, ORDER_CHECK_LIST_PATH, TABLE_PATH } from '@/data/url-list';
import { useFetchQuery } from '@/hooks/query/store/useFetchQuery';
import useAuthState from '@/shared/store/session';
import useToggleState, { changeToggle } from '@/shared/store/toggle';
import { useRouter } from 'next/router';

export const useToggle = () => {
  const storeId = useAuthState(state => state.storeId);
  const { storeInfo } = useFetchQuery({ storeId: storeId ?? '' });
  const isChecked = useToggleState(state => state.isChecked);
  const isUseTable = storeInfo?.use_table;
  const router = useRouter();

  const changeToggleHandler = () => {
    const currentPath = router.asPath;

    if (!isChecked && currentPath !== MANAGEMENT_PATH) {
      router.push(MANAGEMENT_PATH);
    } else if (isUseTable && isChecked && currentPath === MANAGEMENT_PATH) {
      router.push(TABLE_PATH);
    } else if (!isUseTable && isChecked && currentPath === MANAGEMENT_PATH) {
      router.push(ORDER_CHECK_LIST_PATH);
    }
    changeToggle();
  };

  return { changeToggleHandler };
};
