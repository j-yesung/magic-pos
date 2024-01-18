import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { EditFormType } from '../../Container';
import styles from './styles/item.module.css';
import Default from '/public/logo.svg';
interface ItemProps {
  link: string;
  title: string;
  isEdit: boolean;
  id: string;
  setEditTarget: React.Dispatch<React.SetStateAction<EditFormType>>;
  imgUrl: string | null;
  setIsShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setPreImage: React.Dispatch<React.SetStateAction<string | null>>;
}
const Item = ({ link, title, isEdit, id, setEditTarget, imgUrl, setIsShowEditForm, setPreImage }: ItemProps) => {
  const editForm = () => {
    setEditTarget(pre => ({
      ...pre,
      id,
      link_url: link,
      name: title,
    }));

    setPreImage(imgUrl);
    setIsShowEditForm(true);
  };

  return (
    <div className={styles.itemWrapper}>
      <Link
        target="_blank"
        className={clsx(styles.item, {
          [styles.editItem]: isEdit,
        })}
        href={link}
      >
        {imgUrl ? <Image src={imgUrl} width={100} height={100} alt={title ?? 'default_img'} /> : <Default />}

        <div>{title}</div>
      </Link>
      {isEdit && <span onClick={editForm} className={styles.edit}></span>}
    </div>
  );
};

export default Item;
