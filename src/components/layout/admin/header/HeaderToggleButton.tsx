import useToggleState, { changeToggle } from '@/shared/store/toggle';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const isChecked = useToggleState(state => state.isChecked);
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.asPath;
    const managementPath = '/admin/management';

    if (isChecked && currentPath !== managementPath) {
      router.push(managementPath);
    } else if (!isChecked && currentPath === managementPath) {
      router.push('/admin/table');
    }
  }, [isChecked, router]);

  return (
    <>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={changeToggle} checked={isChecked} />
      <label className={styles.label} htmlFor="toggle" />
    </>
  );
};

export default HeaderToggleButton;
