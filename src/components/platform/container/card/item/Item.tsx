import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { EditFormType } from '../../Container';
import styles from './styles/item.module.css';
interface ItemProps {
  link: string;
  title: string;
  isEdit: boolean;
  id: string;
  setEditTarget: React.Dispatch<React.SetStateAction<EditFormType>>;
  imgUrl: string | null;
  setIsShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const Item = ({ link, title, isEdit, id, setEditTarget, imgUrl, setIsShowEditForm }: ItemProps) => {
  const editForm = () => {
    setEditTarget({
      id,
      link_url: link,
      image_url: imgUrl,
      name: title,
    });
    setIsShowEditForm(true);
  };
  const DEFAULT_IMG = '/logo.svg';
  return (
    <div className={styles.itemWrapper}>
      <Link
        target="_blank"
        className={clsx(styles.item, {
          [styles.editItem]: isEdit,
        })}
        href={link}
      >
        <Image src={imgUrl ?? DEFAULT_IMG} width={100} height={100} alt={title ?? 'default_img'} />
        <div>{title}</div>
      </Link>
      {isEdit && <span onClick={editForm} className={styles.edit}></span>}
    </div>
  );
};

export default Item;
