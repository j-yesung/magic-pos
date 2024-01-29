import { ADMIN_INFO } from '@/data/scroll-props';
import styles from '../../styles/Section.module.css';

const AdminFieldItem = ({ activeIndex }: { activeIndex: number }) => {
  return (
    <div className={styles.descriptionItem}>
      <h1>{ADMIN_INFO[activeIndex].id}</h1>
      <h2>{ADMIN_INFO[activeIndex].title}</h2>
      <div className={styles.textBox}>
        <p>{ADMIN_INFO[activeIndex].desc}</p>
        <p>{ADMIN_INFO[activeIndex].caption}</p>
      </div>
    </div>
  );
};

export default AdminFieldItem;
