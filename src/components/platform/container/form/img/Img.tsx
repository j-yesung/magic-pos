import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { UploadParam } from '../Form';
import styles from './styles/img.module.css';
interface ImgProps {
  setInput: React.Dispatch<React.SetStateAction<UploadParam>>;
}
const Img = ({ setInput }: ImgProps) => {
  const [preImage, setPreImage] = useState<string>();

  const changePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    if (fileList?.length !== 0) {
      const file = fileList[0];
      const currentImgUrl = URL.createObjectURL(file);
      setPreImage(currentImgUrl);
      setInput(pre => ({
        ...pre,
        file,
      }));
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
