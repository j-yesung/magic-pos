import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import styles from './styles/img.module.css';
const Img = () => {
  const [preImage, setPreImage] = useState<string>();

  const changePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || null;
    if (files?.length) {
      const currentImgUrl = URL.createObjectURL(files![0]);
      setPreImage(currentImgUrl);
    }
  };
  const DEFAULT_IMG = '/logo.svg';
  return (
    <div className={styles.imgWrapper}>
      <label htmlFor="file" className={styles.imgLabel}>
        <Image className={styles.img} src={preImage ?? DEFAULT_IMG} alt="default image" width={200} height={200} />
      </label>

      <input type="file" id="file" className={styles.file} onChange={changePreview} />
    </div>
  );
};

export default Img;
