import usePlatFormState, {
  resetPlatFormFile,
  resetPrevImg,
  setPlatFormFile,
  setPrevImg,
} from '@/shared/store/platform';
import clsx from 'clsx';
import Image from 'next/image';
import React, { ChangeEvent, useCallback, useEffect, useRef } from 'react';
import styles from './styles/imgForm.module.css';
import CloseButton from '/public/icons/close.svg';
import Pencil from '/public/icons/pencil.svg';

const ImgForm = ({ mode }: { mode: boolean }) => {
  const prevImg = usePlatFormState(state => state.prevImg);
  const imgRef = useRef<HTMLInputElement | null>(null);

  const changePreview = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files || [];
      if (fileList?.length !== 0) {
        const file = fileList[0];
        const currentImgUrl = URL.createObjectURL(file);
        setPrevImg(currentImgUrl);
        setPlatFormFile(file, mode);
      }
    },
    [mode],
  );

  const removeImage = useCallback(() => {
    resetPrevImg(mode);
    resetPlatFormFile(mode);
  }, [mode]);

  useEffect(() => {
    if (!prevImg && imgRef.current?.value) {
      imgRef.current.value = '';
    }
  }, [prevImg]);
  return (
    <div className={styles.imgWrapper}>
      <label htmlFor="file" className={styles.imgLabel}>
        <button
          className={clsx(styles.defaultDeleteButton, prevImg && styles.hasDeleteButton)}
          type="button"
          name="delete-img"
          onClick={removeImage}
        >
          <CloseButton width={26} height={26} />
        </button>
        {prevImg ? (
          <Image className={styles.img} src={prevImg} alt="prev-image" width={1000} height={1000} />
        ) : (
          <div className={styles.defaultTextContainer}>
            <p className={styles.defaultText}>이미지를 등록해주세요</p>
          </div>
        )}
        <div className={styles.editIconWrapper}>
          <Pencil width={26} height={26} />
        </div>
      </label>

      <input
        type="file"
        id="file"
        name="file"
        className={styles.file}
        onChange={changePreview}
        ref={imgRef}
        accept="png, .jpg , .gif"
      />
    </div>
  );
};

export default React.memo(ImgForm);
