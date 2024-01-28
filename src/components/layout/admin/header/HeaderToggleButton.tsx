import useTableStore from '@/shared/store/table';
import useToggleState, { changeToggle } from '@/shared/store/toggle';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const isChecked = useToggleState(state => state.isChecked);
  const isUseTable = useTableStore(state => state.isUseTable);
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.asPath;
    const tablePath = '/admin/table';
    const managementPath = '/admin/management';
    const orderCheckPath = '/admin/order-check-list';

    if (isChecked && currentPath !== managementPath) {
      router.push(managementPath);
    } else if (isUseTable && !isChecked && currentPath === managementPath) {
      router.push(tablePath);
    } else if (!isUseTable && !isChecked && currentPath === managementPath) {
      router.push(orderCheckPath);
    }
  }, [isChecked, isUseTable, router]);

  return (
    <>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={changeToggle} checked={isChecked} />
      <label className={styles.label} htmlFor="toggle" />
    </>
  );
};

export default HeaderToggleButton;
