import clsx from 'clsx';
import Image from 'next/image';
import { ChangeEvent, SetStateAction, useState } from 'react';
import { AddFormType } from '../../PlatFormWrapper';
import styles from './styles/img.module.css';
import Pencil from '/public/icons/pencil.svg';

interface ImgProps {
  setAddForm: React.Dispatch<SetStateAction<AddFormType>>;
}
const ImgForm = ({ setAddForm }: ImgProps) => {
  const [preImage, setPreImage] = useState<string | null>();

  const changePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    if (fileList?.length !== 0) {
      const file = fileList[0];
      const currentImgUrl = URL.createObjectURL(file);

      setPreImage(currentImgUrl);
      setAddForm(pre => ({
        ...pre,
        file,
      }));
    }
  };

  const removeImage = () => {
    setPreImage(null);
    setAddForm(pre => ({
      ...pre,
      // file type은 file?:File | null인데 아래 보다 더 좋은 방법이 있을까..
      file: null,
    }));
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
          X
        </button>
        <Image className={styles.img} src={preImage ?? DEFAULT_IMG} alt="default image" width={1000} height={1000} />
        <div className={styles.editIconWrapper}>
          <Pencil />
        </div>
      </label>

      <input type="file" id="file" className={styles.file} onChange={changePreview} />
    </div>
  );
};

export default ImgForm;
