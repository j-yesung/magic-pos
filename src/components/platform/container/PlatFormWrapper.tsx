import usePlatFormStore, { setPlatFormStoreId } from '@/shared/store/platform';
import useAuthState from '@/shared/store/session';
import { useState } from 'react';
import Card from './card/Card';
import Form from './form/Form';
import AddButton from './form/button/Button';
import styles from './styles/container.module.css';
export interface AddFormType {
  file?: File | null;
  image_url?: string;
  name: string;
  store_id: string;
  createdAt?: string;
  link_url: string;
  id?: string | null;
}

export interface EditPlatFormType {
  id: string;
  name: string;
  link_url: string;
  store_id: string | null;
  image_url?: string | null;
  file?: File | null;
  createdAt?: string;
}

const PlatFormWrapper = () => {
  const storeId = useAuthState(state => state.storeId);
  setPlatFormStoreId(storeId!);

  const isRegist = usePlatFormStore(state => state.isRegist);

  /**
   * 수정기능 Start
   */
  const [isEdit, setIsEdit] = useState(false);
  const [isShowEditForm, setIsShowEditForm] = useState(false);

  return (
    <div className={styles.container}>
      <AddButton />
      <Card />
      {isRegist && <Form />}
    </div>
  );
};

export default PlatFormWrapper;
