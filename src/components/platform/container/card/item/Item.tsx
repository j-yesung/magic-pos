import { setIsEdit, setIsRegist, setPrevData } from '@/shared/store/platform';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import styles from './styles/item.module.css';
import Pencil from '/public/icons/pencil.svg';
import Default from '/public/whiteLogo.svg';
interface ItemProps {
  link: string;
  title: string;
  id: string;
  imgUrl: string | null;
}
const Item = ({ link, title, id, imgUrl }: ItemProps) => {
  const editRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const mouseEnterShowEditButton = () => {
    if (editRef.current && linkRef.current) {
      linkRef.current.style.display = 'flex';
      editRef.current.style.display = 'flex';
    }
  };
  const mouseLeaveHiddenEditButton = () => {
    if (editRef.current && linkRef.current) {
      linkRef.current.style.display = 'none';
      editRef.current.style.display = 'none';
    }
  };

  const clickShowEditPlatFormMode = () => {
    setPrevData({
      id,
      link_url: link,
      name: title,
      image_url: imgUrl ?? null,
    });
    setIsRegist(true);
    setIsEdit(true);
  };
  return (
    <div
      className={styles.itemWrapper}
      onMouseEnter={mouseEnterShowEditButton}
      onMouseLeave={mouseLeaveHiddenEditButton}
    >
      <Link target="_blank" className={styles.item} href={link}>
        {imgUrl ? (
          <Image src={imgUrl} width={1000} height={1000} alt={title} />
        ) : (
          <div className={styles.defaultImg}>
            <Default />
          </div>
        )}

        <div className={styles.itemHeader}>
          <span className={styles.itemTitle}>{title}</span>
        </div>
        <div className={styles.externalLink} ref={linkRef}>
          <LuExternalLink />
          <span>이동하기</span>
        </div>
      </Link>
      <button onClick={clickShowEditPlatFormMode} type="button" className={styles.editWrapper} ref={editRef}>
        <Pencil />
      </button>
    </div>
  );
};

export default Item;
