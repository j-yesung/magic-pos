import { useRouter } from 'next/router';
import styles from '../styles/AdminLayout.module.css';

const CategoryTitle = (adminInfo: AdminCategories) => {
  const path = useRouter().pathname;
  const info = adminInfo.adminCategories.find(item => item.url === path);

  return (
    <section>
      <h1 className={styles.categoryTitle}>{info && info.name}</h1>
    </section>
  );
};

export default CategoryTitle;
