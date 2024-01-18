import { downloadPlatFormImageUrl, insertPlatFormRow, uploadPlatFormImage } from '@/server/api/supabase/platform';
import { Tables } from '@/types/supabase';
import { ChangeEvent, FormEvent, SetStateAction } from 'react';
import { AddFormType } from '../Container';
import ImgForm from './img/ImgForm';
import styles from './styles/form.module.css';
export interface FormProps {
  setAddForm: React.Dispatch<SetStateAction<AddFormType>>;
  addForm: AddFormType;
  setIsRegist: React.Dispatch<SetStateAction<boolean>>;
  setFecthDataList: React.Dispatch<SetStateAction<Tables<'platform'>[]>>;
}

const Form = ({ setAddForm, addForm, setIsRegist, setFecthDataList }: FormProps) => {
  const changeLinkValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setAddForm(pre => ({
      ...pre,
      [name]: value,
    }));
  };
  const changeTitleValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddForm(pre => ({
      ...pre,
      [name]: value,
    }));
  };

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let updateData = { ...addForm };
    if (!addForm.name.trim() || !addForm.link_url.trim()) return alert('써라');

    if (addForm.file) {
      await uploadPlatFormImage(addForm);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(addForm);
      updateData = {
        ...addForm,
        image_url,
      };
      const { data } = await insertPlatFormRow(updateData);
      setFecthDataList(pre => [...pre, ...data!]);
    } else {
      const { data } = await insertPlatFormRow(updateData);
      setFecthDataList(pre => [...pre, ...data!]);
    }

    setIsRegist(pre => !pre);
  };

  return (
    <form onSubmit={submitAddCard} className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <ImgForm setAddForm={setAddForm} />

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
