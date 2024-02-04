import { MANAGEMENT_PATH } from '@/data/url-list';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/AdminLayout.module.css';
import CategoryTitleIcon from './CategoryTitleIcon';

const CategoryTitle = (adminInfo: AdminCategories) => {
  const path = useRouter().pathname;
  const info = adminInfo.adminCategories.find(item => item.url === path);
  const [isManagementPathName, setIsManagementPathName] = useState(false);

  useEffect(() => {
    if (path === MANAGEMENT_PATH) {
      setIsManagementPathName(true);
    } else {
      setIsManagementPathName(false);
    }
  }, [path]);

  return (
    <section className={clsx(isManagementPathName && styles.categoryTitleWrapper)}>
      <div className={styles.iconWrapper}>
        <div className={styles.borderBottomTemp}>
          <CategoryTitleIcon />
          <h1 className={styles.categoryTitle}>{info && info.name}</h1>
        </div>
      </div>
    </section>
  );
};

export default CategoryTitle;
