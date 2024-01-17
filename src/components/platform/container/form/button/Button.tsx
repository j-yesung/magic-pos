import { Tables } from '@/types/supabase';
import styles from './styles/button.module.css';
interface ButtonProps {
  setIsRegist: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDataList: Tables<'platform'>[];
  buttonType?: string;
  isEdit: boolean;
  setIsShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
}
const Button = ({ setIsRegist, fetchDataList, buttonType, setIsEdit, isEdit, setIsShowEditForm }: ButtonProps) => {
  const clickShowForm = () => {
    setIsRegist(pre => !pre);
  };
  const clickIsEdit = () => {
    setIsEdit(pre => !pre);
    setIsRegist(false);
    setIsShowEditForm(false);
  };
  return (
    <div className={styles.buttonGroup}>
      {!isEdit && (
        <button onClick={clickShowForm} name="등록">
          등록
        </button>
      )}

      {fetchDataList.length >= 1 && (
        <button name="수정" onClick={clickIsEdit}>
          편집
        </button>
      )}
    </div>
  );
};

export default Button;
