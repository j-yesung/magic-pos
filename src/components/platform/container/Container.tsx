import {
  downloadPlatFormImageUrl,
  fetchPlatForm,
  removePlatFormData,
  removePlatFormImage,
  updatePlatFormData,
  uploadPlatFormImage,
} from '@/server/api/supabase/platform';
import { isEmptyObject } from '@/shared/helper';
import useAuthStore from '@/shared/store/auth';
import { Tables, TablesInsert } from '@/types/supabase';
import clsx from 'clsx';
import moment from 'moment';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import Button from './form/button/Button';
import styles from './styles/container.module.css';
import Logo from '/public/logo.svg';
export interface AddFormType {
  file?: File | null;
  image_url?: string;
  name: string;
  store_id: string;
  createdAt?: string;
  link_url: string;
  id?: string | null;
}

export interface EditFormType {
  id: string;
  name: string;
  link_url: string;
  store_id: string | null;
  image_url?: string | null;
  file?: File | null;
  createdAt?: string;
}

const Container = () => {
  const storeId = useAuthStore(state => state.storeId);
  const [fetchDataList, setFecthDataList] = useState<Tables<'platform'>[]>([]);
  const [addForm, setAddForm] = useState<AddFormType>({
    name: '',
    link_url: '',
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

  /**
   * 수정기능 Start
   */
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
  const updatePlatForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editData: EditFormType = {
      ...editTarget,
    };

    // object의 각 value 값을 비교해서 틀린 값만을 추출하기
    let comparedData = Object.entries(editData).reduce((acc, [key, value]) => {
      // 조금더 이해하기 위해 주석을 지우지 않았습니다.
      // for (const key in editRef.current) {
      //   if (editRef.current[key as keyof EditFormType] !== value) {
      //     acc[key] = value;
      //   }
      // }
      if (editRef.current![key as keyof EditFormType] !== value) {
        acc[key as keyof EditFormType] = value;
      }
      if (editRef.current!['image_url']) {
        acc['image_url'] = editRef.current!['image_url'];
      }

      return acc;
    }, new Object() as EditFormType);

    console.log(editData);
    console.log(editRef.current);
    console.log(preImage);
    if (isEmptyObject(comparedData) && editRef.current?.image_url === preImage) return;
    // 나중에 refactoring하기
    comparedData.id = editData.id;
    comparedData.store_id = editData.store_id;
    console.log('----------------------------------');
    console.log(preImage);
    console.log(editRef.current);
    console.log(editData);
    if (editRef.current?.image_url && comparedData.file) {
      console.log('1111111111');
      comparedData.createdAt = moment().toISOString();
      // 기존 이미지 삭제
      await removePlatFormImage(editRef.current);
      // 새로운 이미지 업로드
      await uploadPlatFormImage(comparedData);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(comparedData);
      comparedData = {
        ...comparedData,
        image_url,
      };
      const { file, createdAt, ...updateTarget } = comparedData;
      await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
    }
    if (!editRef.current?.image_url && comparedData.file) {
      await uploadPlatFormImage(comparedData);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(comparedData);
      comparedData = {
        ...comparedData,
        image_url,
      };
      const { file, createdAt, ...updateTarget } = comparedData;
      await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
      console.log('22222222222222222');
    }

    if (!preImage && !comparedData.link_url && !comparedData.name) {
      console.log('여기인뎅');
      console.log(comparedData);
      await removePlatFormImage(comparedData);
      await updatePlatFormData({ ...comparedData, image_url: null } as TablesInsert<'platform'>);
      const { platform, error } = await fetchPlatForm(storeId!);
      setFecthDataList(platform);
      setIsShowEditForm(false);
      return;
    }
    console.log('11');
    console.log(comparedData);
    await updatePlatFormData(comparedData as TablesInsert<'platform'>);
    console.log('22');
    const { platform, error } = await fetchPlatForm(storeId!);
    setFecthDataList(platform);
    setIsShowEditForm(false);
  };

  // 수정 할 카드의 정보를 담는 useEffect입니다.
  useEffect(() => {
    if (editRef.current) return;
    editRef.current = { ...editTarget };
    return () => {
      editRef.current = null;
    };
  }, [isShowEditForm]);

  /**
   * 수정 기능 End
   */

  /**
   * 삭제 기능
   */
  const onClickRemoveData = async () => {
    await removePlatFormData(editTarget.id);
    const { platform } = await fetchPlatForm(editTarget.store_id!);
    setFecthDataList(platform);
    setIsShowEditForm(false);
  };

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

              {preImage ? (
                <Image className={styles.img} src={preImage} alt={editTarget.name} width={200} height={200} />
              ) : (
                <Logo />
              )}
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
            <button onClick={onClickRemoveData} type="button" className={styles.button}>
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
