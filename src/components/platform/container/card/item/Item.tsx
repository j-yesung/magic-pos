import usePlatFormState, { setIsEdit, setIsRegist, setPrevData } from '@/shared/store/platform';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useRef } from 'react';
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
  const store_id = usePlatFormState(state => state.store_id);

  const mouseEnterShowEditButton = useCallback(() => {
    if (editRef.current && linkRef.current) {
      linkRef.current.style.display = 'flex';
      editRef.current.style.display = 'flex';
    }
  }, []);
  const mouseLeaveHiddenEditButton = useCallback(() => {
    if (editRef.current && linkRef.current) {
      linkRef.current.style.display = 'none';
      editRef.current.style.display = 'none';
    }
  }, []);

  const clickShowEditPlatFormMode = useCallback(() => {
    setPrevData({
      id,
      link_url: link,
      name: title,
      image_url: imgUrl ?? null,
      store_id,
    });
    setIsRegist(true);
    setIsEdit(true);
  }, [id, imgUrl, link, store_id, title]);

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
            <Default width={100} height={100} />
          </div>
        )}

        <div className={styles.itemHeader}>
          <span className={styles.itemTitle}>{title}</span>
        </div>
        <div className={styles.externalLink} ref={linkRef}>
          <LuExternalLink width={100} height={100} />
          <span>이동하기</span>
        </div>
      </Link>
      <button onClick={clickShowEditPlatFormMode} type="button" className={styles.editWrapper} ref={editRef}>
        <Pencil width={1000} height={1000} />
      </button>
    </div>
  );
};

export default React.memo(Item);
