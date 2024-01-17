import { fetchPlatForm } from '@/server/api/supabase/platform';
import useAuthStore from '@/shared/store/auth';
import { Tables } from '@/types/supabase';
import moment from 'moment';
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
  useEffect(() => {
    getPlatFormDataFromSupabase().then(result => {
      if (result) {
        setFecthDataList(result);
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Button setIsRegist={setIsRegist} fetchDataList={fetchDataList} buttonType="regist" />

      <Card fetchDataList={fetchDataList} />

      {isRegist && (
        <Form addForm={addForm} setFecthDataList={setFecthDataList} setAddForm={setAddForm} setIsRegist={setIsRegist} />
      )}
    </div>
  );
};

export default Container;
