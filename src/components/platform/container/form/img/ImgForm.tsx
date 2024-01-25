import { resetPlatFormFile, setPlatFormFile } from '@/shared/store/platform';
import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import styles from './styles/img.module.css';
import CloseButton from '/public/icons/close.svg';
import Pencil from '/public/icons/pencil.svg';
const ImgForm = () => {
  const [preImage, setPreImage] = useState<string | null>();

  const changePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    if (fileList?.length !== 0) {
      const file = fileList[0];
      const currentImgUrl = URL.createObjectURL(file);

      setPreImage(currentImgUrl);
      setPlatFormFile(file);
    }
  };

  const removeImage = () => {
    setPreImage(null);
    resetPlatFormFile();
  };

  // 사진이 있을 때, onMouesOver 하면 x 표시가 보이고, onMouseleave 하면 x 표시가 안보이고 preImage && styles.hasDeleteButton
  // 사진이 없을 때는 onMouseOver || onMouseleave 안보이고
  const DEFAULT_IMG = '/logo.svg';
  return (
    <div className={styles.imgWrapper}>
      <label htmlFor="file" className={styles.imgLabel}>
        <button
          className={clsx(styles.defaultDeleteButton, preImage && styles.hasDeleteButton)}
          type="button"
          name="delete-img"
          onClick={removeImage}
        >
          <CloseButton />
        </button>
        <Image className={styles.img} src={preImage ?? DEFAULT_IMG} alt="default image" width={1000} height={1000} />
        <div className={styles.editIconWrapper}>
          <Pencil />
        </div>
      </label>

      <input type="file" id="file" name="file" className={styles.file} onChange={changePreview} />
    </div>
  );
};

export default ImgForm;
