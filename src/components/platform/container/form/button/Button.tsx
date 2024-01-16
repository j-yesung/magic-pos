import styles from './styles/button.module.css';
interface ButtonProps {
  setIsRegist: React.Dispatch<React.SetStateAction<boolean>>;
  cardList: {
    name: string;
    link_url: string;
  }[];
  buttonType?: string;
}
const Button = ({ setIsRegist, cardList, buttonType }: ButtonProps) => {
  const clickShowForm = () => {
    setIsRegist(pre => !pre);
  };

  return (
    <div className={styles.buttonGroup}>
      <button onClick={clickShowForm} name="등록">
        등록
      </button>
      {cardList.length >= 1 && <button name="수정">편집</button>}
    </div>
  );
};

export default Button;
