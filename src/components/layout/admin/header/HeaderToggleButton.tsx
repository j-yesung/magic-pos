import useTableStore from '@/shared/store/table';
import useToggleState, { changeToggle } from '@/shared/store/toggle';
import { useRouter } from 'next/router';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const isChecked = useToggleState(state => state.isChecked);
  const isUseTable = useTableStore(state => state.isUseTable);
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

  return (
    <>
      <input className={styles.toggle} type="checkbox" id="toggle" checked={isChecked} onChange={changeToggleHandler} />
      <label className={styles.label} htmlFor="toggle" />
    </>
  );
};

export default HeaderToggleButton;
