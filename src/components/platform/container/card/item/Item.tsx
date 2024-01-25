import { setIsEdit, setIsRegist, setPrevData } from '@/shared/store/platform';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import { LuExternalLink } from 'react-icons/lu';
import { EditFormType } from '../../PlatFormWrapper';
import styles from './styles/item.module.css';
import Pencil from '/public/icons/pencil.svg';
import Default from '/public/whiteLogo.svg';
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
const Item = ({ link, title, id, setEditTarget, imgUrl, setIsShowEditForm, setPreImage }: ItemProps) => {
  const editRef = useRef<HTMLButtonElement>(null);
  const linkRef = useRef<HTMLDivElement>(null);

  const editForm = () => {
    setEditTarget(pre => ({
      ...pre,
      id,
      link_url: link,
      name: title,
      image_url: imgUrl ?? null,
    }));

    setPreImage(imgUrl);
    setIsShowEditForm(true);
  };

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

  const clickShowEditPlatFormMoal = () => {
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
      <button onClick={clickShowEditPlatFormMoal} type="button" className={styles.editWrapper} ref={editRef}>
        <Pencil />
      </button>

      {/* {isEdit && <span onClick={editForm} className={styles.edit}></span>} */}
    </div>
  );
};

export default Item;
