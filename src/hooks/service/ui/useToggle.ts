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
    const tablePath = '/admin/table';
    const managementPath = '/admin/management';
    const orderCheckPath = '/admin/order-check-list';

    if (!isChecked && currentPath !== managementPath) {
      router.push(managementPath);
    } else if (isUseTable && isChecked && currentPath === managementPath) {
      router.push(tablePath);
    } else if (!isUseTable && isChecked && currentPath === managementPath) {
      router.push(orderCheckPath);
    }
    changeToggle();
  };

  return { changeToggleHandler };
};
