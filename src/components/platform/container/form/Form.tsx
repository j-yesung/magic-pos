import { downloadPlatFormImageUrl, uploadPlatFormImage } from '@/server/api/supabase/platform';
import useAuthStore from '@/shared/store/auth';
import moment from 'moment';
import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import Img from './img/Img';
import styles from './styles/form.module.css';
interface FormProps {
  setCardList: React.Dispatch<
    SetStateAction<
      {
        name: string;
        link_url: string;
        image_url?: string;
        store_id: string;
        id?: string;
      }[]
    >
  >;
}
export interface UploadParam {
  name: string;
  link_url: string;
  createdAt: string;
  store_id: string | null;
  file?: File;
  image_url?: string;
}
const Form = ({ setCardList }: FormProps) => {
  const { storeId } = useAuthStore();
  const [input, setInput] = useState<UploadParam>({
    name: '',
    link_url: '',
    createdAt: moment().toISOString(),
    store_id: storeId,
  });

  const changeLinkValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInput(pre => ({
      ...pre,
      [name]: value,
    }));
  };
  const changeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(pre => ({
      ...pre,
      [name]: value,
    }));
  };

  // 이미지 저장 안 할 때 이미지 업로드 하지 않고

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updateData = { ...input };
    if (!input.name.trim() || !input.link_url.trim()) alert('써라');

    await uploadPlatFormImage(input);

    const { publicUrl: image_url } = downloadPlatFormImageUrl(input);
    updateData = {
      ...input,
      image_url,
    };
  };

  return (
    <form onSubmit={submitAddCard} className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <Img setInput={setInput} />

        <div className={styles.inputWrapper}>
          <input
            className={styles.input}
            onChange={changeLinkValue}
            name="link_url"
            type="text"
            placeholder="link를 넣어주세요"
          />
          <input
            className={styles.input}
            onChange={changeTitleValue}
            name="name"
            type="text"
            placeholder="어디사이트인가요?"
          />
        </div>
      </div>

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.button}>
          <p>등록</p>
        </button>
        <button type="button" className={styles.button}>
          <p>취소</p>
        </button>
      </div>
    </form>
  );
};

export default Form;
