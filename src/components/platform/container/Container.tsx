import { fetchPlatForm } from '@/server/api/supabase/platform';
import useAuthStore from '@/shared/store/auth';
import { Tables } from '@/types/supabase';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
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
  store_id: string | null;
  image_url?: string | null;
  file?: File | null;
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
  useEffect(() => {
    getPlatFormDataFromSupabase().then(result => {
      if (result) {
        setFecthDataList(result);
      }
    });
  }, []);

  const [isRegist, setIsRegist] = useState(false);
  // edit
  const [isEdit, setIsEdit] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);
  const [preImage, setPreImage] = useState<string | null>(null);
  const [editTarget, setEditTarget] = useState<EditFormType>({
    id: '',
    name: '',
    link_url: '',
    store_id: storeId!,
    image_url: preImage ?? null,
  });
  console.log(editTarget);
  const editRef = useRef<EditFormType | null>();

  const clickEditCancel = () => {
    setEditTarget(pre => ({
      ...pre,
      id: '',
      name: '',
      link_url: '',
      image_url: preImage ?? null,
      file: null,
    }));
    setIsShowEditForm(false);
  };

  const changePreview = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files || [];
    if (fileList?.length !== 0) {
      const file = fileList[0];
      const currentImgUrl = URL.createObjectURL(file);

      setPreImage(currentImgUrl);
      setEditTarget(pre => ({
        ...pre,
        file,
      }));
    }
  };

  const removeImage = () => {
    setPreImage(null);

    setEditTarget(pre => ({
      ...pre,
      file: null,
    }));
  };
  const changeEditForm = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditTarget(pre => ({
      ...pre,
      [name]: value,
    }));
  };
  const updatePlatForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updateData = {
      ...editTarget,
    };
    console.log(editRef.current);
    console.log(updateData);
    console.log(JSON.stringify(editRef.current) === JSON.stringify(updateData));
  };
  useEffect(() => {
    if (editRef.current) return;
    editRef.current = editTarget;
    return () => {
      editRef.current = null;
    };
  }, [isShowEditForm]);

  const DEFAULT_IMG = '/logo.svg';
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
        setPreImage={setPreImage}
      />

      {isRegist && (
        <Form addForm={addForm} setFecthDataList={setFecthDataList} setAddForm={setAddForm} setIsRegist={setIsRegist} />
      )}

      {isShowEditForm && (
        <form onSubmit={updatePlatForm} className={styles.formContainer}>
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
              <Image
                className={styles.img}
                src={preImage ?? DEFAULT_IMG}
                alt={editTarget.name}
                width={200}
                height={200}
              />
            </label>

            <input type="file" id="file" className={styles.file} onChange={changePreview} />
          </div>

          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              value={editTarget.link_url}
              placeholder="link를 넣어주세요"
              name="link_url"
              onChange={changeEditForm}
            />
            <input
              className={styles.input}
              type="text"
              name="name"
              placeholder="어디사이트인가여"
              value={editTarget.name}
              onChange={changeEditForm}
            />
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
