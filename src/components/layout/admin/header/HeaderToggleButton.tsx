import useToggleStore from '@/shared/store/toggle';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/AdminLayout.module.css';

const HeaderToggleButton = () => {
  const { isToggle, changeToggle } = useToggleStore();
  const router = useRouter();

  useEffect(() => {
    const currentPath = router.asPath;
    const managementPath = '/admin/management';

    if (isToggle && currentPath !== managementPath) {
      router.push(managementPath);
    } else if (!isToggle && currentPath === managementPath) {
      router.push('/admin/store');
    }
  }, [isToggle, router]);

  return (
    <div>
      <input className={styles.toggle} type="checkbox" id="toggle" onChange={changeToggle} defaultChecked={isToggle} />
      <label className={styles.label} htmlFor="toggle" />
    </div>
  );
};

export default HeaderToggleButton;
