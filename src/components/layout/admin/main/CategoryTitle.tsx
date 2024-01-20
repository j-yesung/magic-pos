import useAuthStore from '@/shared/store/auth';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/AdminLayout.module.css';
import CategoryTitleIcon from './CategoryTitleIcon';

const CategoryTitle = (adminInfo: AdminCategories) => {
  const path = useRouter().pathname;
  const info = adminInfo.adminCategories.find(item => item.url === path);
  const auth = useAuthStore(state => state.auth);
  const [isManagementPathName, setIsManagementPathName] = useState(false);

  useEffect(() => {
    if (path === '/admin/management') {
      setIsManagementPathName(true);
    } else {
      setIsManagementPathName(false);
    }
  }, [auth, path, isManagementPathName]);

  return (
    <section className={clsx(isManagementPathName && styles.categoryTitleWrapper)}>
      <div className={styles.iconWrapper}>
        <CategoryTitleIcon />
        <h1 className={styles.categoryTitle}>{info && info.name}</h1>
      </div>
    </section>
  );
};

export default CategoryTitle;
