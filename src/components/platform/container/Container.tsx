import { fetchPlatForm } from '@/server/api/supabase/platform';
import useAuthStore from '@/shared/store/auth';
import { Tables } from '@/types/supabase';
import moment from 'moment';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import Button from './form/button/Button';
import styles from './styles/container.module.css';
export interface AddFormType {
  file?: File | null;
  image_url?: string;
  name: string;
  store_id: string;
  createdAt: string;
  link_url: string;
}

export interface EditFormType {
  id: string;
  name: string;
  link_url: string;
  store_id?: string | null;
  image_url: string | null;
}

const Container = () => {
  const storeId = useAuthStore(state => state.storeId);
  const [fetchDataList, setFecthDataList] = useState<Tables<'platform'>[]>([]);
  const [addForm, setAddForm] = useState<AddFormType>({
    name: '',
    link_url: '',
    createdAt: moment().toISOString(),
    store_id: storeId!,
  });

  const getPlatFormDataFromSupabase = async () => {
    const { platform, error } = await fetchPlatForm(storeId!);
    if (error) throw error;
    return platform;
  };
  const [isRegist, setIsRegist] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [editTarget, setEditTarget] = useState<EditFormType>({
    id: '',
    name: '',
    link_url: '',
    store_id: storeId,
    image_url: '' || null,
  });

  const clickEditCancel = () => {
    setIsShowEditForm(false);
  };
  useEffect(() => {
    getPlatFormDataFromSupabase().then(result => {
      if (result) {
        setFecthDataList(result);
      }
    });
  }, []);
  const DEFAUL_IMG = '/logo.svg';
  return (
    <div className={styles.container}>
      <Button
        setIsRegist={setIsRegist}
        fetchDataList={fetchDataList}
        buttonType="regist"
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        setIsShowEditForm={setIsShowEditForm}
      />

      <Card
        fetchDataList={fetchDataList}
        isEdit={isEdit}
        setEditTarget={setEditTarget}
        setIsShowEditForm={setIsShowEditForm}
      />

      {isRegist && (
        <Form addForm={addForm} setFecthDataList={setFecthDataList} setAddForm={setAddForm} setIsRegist={setIsRegist} />
      )}

      {isShowEditForm && (
        <form onSubmit={e => e.preventDefault()} className={styles.formContainer}>
          <div className={styles.formWrapper}>
            <Image src={editTarget.image_url ?? DEFAUL_IMG} width={200} height={200} alt={editTarget.name} />
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              value={editTarget.link_url}
              placeholder="link를 넣어주세요"
              name="link_url"
            />
            <input className={styles.input} type="text" placeholder="어디사이트인가여" value={editTarget.name} />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.button}>
              <p>수정</p>
            </button>
            <button type="button" className={styles.button}>
              <p>삭제</p>
            </button>
            <button onClick={clickEditCancel} type="button" className={styles.button}>
              <p>취소</p>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Container;
