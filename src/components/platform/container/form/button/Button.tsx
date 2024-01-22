import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import styles from './styles/button.module.css';
interface ButtonProps {
  setIsRegist: React.Dispatch<React.SetStateAction<boolean>>;
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
  fetchDataList: Tables<'platform'>[];
  buttonType?: string;
  isEdit: boolean;
  setIsShowEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  setClickedTab: React.Dispatch<React.SetStateAction<string>>;
  clikcedTab: string;
}
const Button = ({
  setIsRegist,
  fetchDataList,
  buttonType,
  setIsEdit,
  isEdit,
  setIsShowEditForm,
  setClickedTab,
  clikcedTab,
}: ButtonProps) => {
  const ADD = 'add';
  const EDIT = 'edit';
  const REMOVE = 'remove';
  const clickShowForm = (param: string) => {
    setClickedTab(param);
    setIsRegist(pre => !pre);
  };
  const clickIsEdit = (param: string) => {
    setIsEdit(pre => !pre);
    setIsRegist(false);
    setIsShowEditForm(false);
    setClickedTab(param);
  };

  return (
    <div className={styles.buttonGroup}>
      {/* {(!isEdit || fetchDataList.length === 0) && (
        <button
          className={clsx(styles.button, {
            [styles.active]: clikcedTab === ADD,
          })}
          onClick={() => clickShowForm(ADD)}
          name="등록"
        >
          추가
        </button>
      )} */}
      {
        <button
          className={clsx(styles.button, {
            [styles.active]: clikcedTab === ADD,
          })}
          onClick={() => clickShowForm(ADD)}
          name="등록"
        >
          추가
        </button>
      }
      {/* 
      {fetchDataList.length >= 1 && (
        <button name="수정" onClick={clickIsEdit}>
          편집
        </button>
      )} */}

      {
        <button
          className={clsx(styles.button, {
            [styles.active]: clikcedTab === EDIT,
          })}
          name="수정"
          onClick={() => clickIsEdit(EDIT)}
        >
          편집
        </button>
      }
      <button
        className={clsx(styles.button, {
          [styles.active]: clikcedTab === REMOVE,
        })}
        name="삭제"
        onClick={() => setClickedTab(REMOVE)}
      >
        삭제
      </button>
    </div>
  );
};

export default Button;
