import useToggleStore from '@/shared/store/toggle';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const { isChecked, changeToggle } = useToggleStore();
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
    <div>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={changeToggle} checked={isChecked} />
      <label className={styles.label} htmlFor="toggle" />
    </div>
  );
};

export default HeaderToggleButton;
