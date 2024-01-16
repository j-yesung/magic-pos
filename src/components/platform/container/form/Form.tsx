import useAuthStore from '@/shared/store/auth';
import { ChangeEvent, FormEvent, SetStateAction, useState } from 'react';
import Img from './img/Img';
import styles from './styles/form.module.css';
interface FormProps {
  setCardList: React.Dispatch<
    SetStateAction<
      {
        name: string;
        link_url: string;
      }[]
    >
  >;
}
const Form = ({ setCardList }: FormProps) => {
  const [input, setInput] = useState({
    name: '',
    link_url: '',
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
  const submitAddCard = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCardList(pre => [...pre, input]);
  };
  const { storeId } = useAuthStore();

  return (
    <form onSubmit={submitAddCard} className={styles.formContainer}>
      <div className={styles.formWrapper}>
        <Img />

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
            name="title"
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
