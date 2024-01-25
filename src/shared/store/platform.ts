import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import { Tables } from '@/types/supabase';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface PlatformStore {
  store_id: string | null;
  isRegist: boolean;
  addPlatForm: AddPlatFormType;
  editPlatForm: EditPlatFormType;
  prevData: EditPlatFormType;
  isEdit: boolean;
  fetchPlatFormData: Tables<'platform'>[];
  prevImg: string | null;
}

interface PrevDataType {
  id: string;
  name: string;
  link_url: string;
  store_id?: string | null;
  image_url?: string | null;
  file?: File | null;
  createdAt?: string;
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
  store_id: null,
};

const initialPrevData = {
  id: '',
  name: '',
  link_url: '',
  image_url: null,
  file: null,
  store_id: null,
};

const initialPrevImg = null;

const initialFetchPlatForm: Tables<'platform'>[] = [];

const usePlatFormStore = create<PlatformStore>()(() => ({
  store_id: null,
  isRegist: false,
  isEdit: false,
  addPlatForm: initialAddPlatform,
  editPlatForm: initialEditPlatForm,
  prevData: initialPrevData,
  fetchPlatFormData: initialFetchPlatForm,
  prevImg: initialPrevImg,
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

export const setPlatFormStoreId = (store_id: string) =>
  usePlatFormStore.setState(state => ({
    ...state,
    store_id,
    addPlatForm: {
      ...state.addPlatForm,
      store_id,
    },
    editPlatForm: {
      ...state.editPlatForm,
      store_id,
    },
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

/**
 *
 * @param file
 * @param mode mode가 true 면 edit일 때, mode가 false 이면 add 일 때
 */
export const setPlatFormFile = (file: File, mode: boolean) => {
  if (!mode) {
    usePlatFormStore.setState(state => ({
      ...state,
      addPlatForm: { ...state.addPlatForm, file },
    }));
  }
  if (mode) {
    usePlatFormStore.setState(state => ({
      ...state,
      editPlatForm: { ...state.editPlatForm, file },
    }));
  }
};

/**
 *@parma 편집버튼 누르면 기존 데이터를 담는 함수
 */

export const setPrevData = (param: PrevDataType) =>
  usePlatFormStore.setState(state => ({
    ...state,
    prevData: { ...state.prevData, ...param },
    editPlatForm: { ...state.editPlatForm, ...param },
    prevImg: param.image_url,
  }));

export const setPrevImg = (url: string) =>
  usePlatFormStore.setState(state => ({
    ...state,
    prevImg: url ?? null,
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
  usePlatFormStore.setState(state => ({
    ...state,
    fetchPlatFormData: [...state.fetchPlatFormData, ...data],
  }));
};

/**
 *
 * @param mode false 면 카드 등록 할 때 file true면 편집할 때 file을 초기화
 */
export const resetPlatFormFile = (mode: boolean) => {
  if (!mode) {
    usePlatFormStore.setState(state => ({
      ...state,
      addPlatForm: { ...state.addPlatForm, file: null },
    }));
  }
  if (mode) {
    usePlatFormStore.setState(state => ({
      ...state,
      editPlatForm: { ...state.editPlatForm, file: null, image_url: null },
    }));
  }
};

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

export const resetIsEditMode = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    isEdit: false,
  }));
export const resetIsRegist = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    isRegist: false,
  }));

export const resetPrevImg = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    prevImg: null,
  }));

export const resetPrevData = () =>
  usePlatFormStore.setState(state => ({
    ...state,
    prevData: initialPrevData,
  }));
