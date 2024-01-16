import Link from 'next/link';
import styles from './styles/item.module.css';
interface ItemProps {
  link: string;
  title: string;
}
const Item = ({ link, title }: ItemProps) => {
  return (
    <Link target="_blank" className={styles.item} href={link}>
      <div>{title}</div>
    </Link>
  );
};

export default Item;
