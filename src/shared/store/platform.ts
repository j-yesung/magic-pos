import { Tables } from '@/types/supabase';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface PlatformStore {
  isRegist: boolean;
  addPlatForm: {
    file: File | null;
    name: string;
    store_id: string;
    link_url: string;
  };
  editPlatForm: {
    id: string;
    name: string;
    link_url: string;
    store_id?: string | null;
    image_url?: string | null;
    file?: File | null;
    createdAt?: string;
  };
  isEdit: boolean;
  fetchPlatFormData: Tables<'platform'>[];
}

const initialAddPlatform = {
  name: '',
  link_url: '',
  file: null,
  store_id: '',
};
const initialEditPlatForm = {
  id: '',
  name: '',
  link_url: '',
  image_url: null,
  file: null,
};

const initialFetchPlatForm: Tables<'platform'>[] = [];

const usePlatFormStore = create<PlatformStore>()(() => ({
  isRegist: false,
  isEdit: false,
  addPlatForm: initialAddPlatform,
  editPlatForm: initialEditPlatForm,
  fetchPlatFormData: initialFetchPlatForm,
}));

export default usePlatFormStore;

/**
 * toggle
 */
export const setIsRegist = (param: boolean) =>
  usePlatFormStore.setState(state => ({
    ...state,
    isRegist: param,
  }));
export const setIsEdit = (param: boolean) =>
  usePlatFormStore.setState(state => ({
    ...state,
    isEdit: param,
  }));

/**
 *
 * @param e AddForm
 */
export const setAddPlatForm = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  usePlatFormStore.setState(state => ({
    ...state,
    addPlatForm: { ...state.addPlatForm, [name]: value },
  }));
};

export const setAddPlatFormStoreId = (store_id: string) =>
  usePlatFormStore.setState(state => ({
    ...state,
    addPlatForm: {
      ...state.addPlatForm,
      store_id,
    },
  }));

/**
 *  수정할 데이터
 */
export const setEditPlatForm = (e: ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  usePlatFormStore.setState(state => ({
    ...state,
    editPlatForm: { ...state.editPlatForm, [name]: value },
  }));
};
export const setPlatFormFile = (file: File) =>
  usePlatFormStore.setState(state => ({
    ...state,
    addPlatForm: { ...state.addPlatForm, file },
  }));

/**
 *
 * @param data initial data저장 할 state
 * @returns
 */
export const setFetchPlatFormData = (data: Tables<'platform'>[]) =>
  usePlatFormStore.setState(state => ({
    ...state,
    fetchPlatFormData: data,
  }));

/**
 *
 * @param data platform카드 추가해서 supabase에서 불러온 데이터
 * @returns
 */
export const setAddDataToFetchPlatForm = (data: Tables<'platform'>[]) => {
  console.log(data);
  usePlatFormStore.setState(state => ({
    ...state,
    fetchPlatFormData: [...state.fetchPlatFormData, ...data],
  }));
};

/**
 *
 * @returns state값 reset입니다.
 */
export const resetPlatFormFile = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    addPlatForm: { ...state.addPlatForm, file: null },
  }));

export const resetAddPlatForm = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    addPlatForm: initialAddPlatform,
  }));

export const resetEditPlatForm = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    editPlatForm: initialEditPlatForm,
  }));
