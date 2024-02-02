import { handleMetaImageException } from '@/components/platform/utility/usePlatformHelper';
import { getOpenGraphMetaImage } from '@/server/api/external/openGraph';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import { debounce } from 'lodash';
import { ChangeEvent } from 'react';
import { create } from 'zustand';

interface PlatformStore {
  store_id: string | null;
  isRegist: boolean;
  addPlatForm: AddPlatFormType;
  editPlatForm: EditPlatFormType;
  prevData: EditPlatFormType;
  isEdit: boolean;
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
  metaImage: null,
};
const initialEditPlatForm = {
  id: '',
  name: '',
  link_url: '',
  image_url: null,
  file: null,
  store_id: null,
  metaImage: null,
};

const initialPrevData = {
  id: '',
  name: '',
  link_url: '',
  image_url: null,
  file: null,
  store_id: null,
  metaImage: null,
};

const initialPrevImg = null;

const usePlatFormState = create<PlatformStore>()(() => ({
  store_id: null,
  isRegist: false,
  isEdit: false,
  addPlatForm: initialAddPlatform,
  editPlatForm: initialEditPlatForm,
  prevData: initialPrevData,
  prevImg: initialPrevImg,
}));

export default usePlatFormState;

/**
 * toggle
 */
export const setIsRegist = (param: boolean) =>
  usePlatFormState.setState(state => ({
    ...state,
    isRegist: param,
  }));
export const setIsEdit = (param: boolean) =>
  usePlatFormState.setState(state => ({
    ...state,
    isEdit: param,
  }));

export const setPlatFormStoreId = (store_id: string) =>
  usePlatFormState.setState(state => ({
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
export const setAddPlatForm = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
  const notHasPrevImg = !usePlatFormState.getState().prevImg;
  const { name, value } = e.target;
  if (name === 'link_url') {
    if (notHasPrevImg) {
      const extractedImage = await getOpenGraphMetaImage(value);
      if (extractedImage && notHasPrevImg) {
        const confirmedImageUrl = handleMetaImageException(extractedImage);
        usePlatFormState.setState(state => ({
          ...state,
          addPlatForm: {
            ...state.addPlatForm,
            metaImage: confirmedImageUrl,
          },
        }));

        setPrevImg(confirmedImageUrl);
      } else if (notHasPrevImg) {
        resetPrevImg();
      }
    }
  }
  usePlatFormState.setState(state => ({
    ...state,
    addPlatForm: { ...state.addPlatForm, [name]: value },
  }));
}, 300);

/**
 *  수정할 데이터
 */
export const setEditPlatForm = debounce(async (e: ChangeEvent<HTMLInputElement>) => {
  const notHasPrevImg = !usePlatFormState.getState().prevImg;
  const { name, value } = e.target;
  if (name === 'link_url') {
    if (notHasPrevImg) {
      const extractedImage = await getOpenGraphMetaImage(value);

      if (extractedImage && notHasPrevImg) {
        const confirmedImageUrl = handleMetaImageException(extractedImage);
        usePlatFormState.setState(state => ({
          ...state,
          editPlatForm: {
            ...state.editPlatForm,
            metaImage: confirmedImageUrl,
          },
        }));
        setPrevImg(confirmedImageUrl);
      } else if (notHasPrevImg) {
        resetPrevImg();
      }
    }
  }

  usePlatFormState.setState(state => ({
    ...state,
    editPlatForm: { ...state.editPlatForm, [name]: value },
  }));
}, 300);

/**
 *
 * @param file
 * @param mode mode가 true 면 edit일 때, mode가 false 이면 add 일 때
 */
export const setPlatFormFile = (file: File, mode: boolean) => {
  if (!mode) {
    usePlatFormState.setState(state => ({
      ...state,
      addPlatForm: { ...state.addPlatForm, file },
    }));
  }
  if (mode) {
    usePlatFormState.setState(state => ({
      ...state,
      editPlatForm: { ...state.editPlatForm, file },
    }));
  }
};

/**
 *@parma 편집버튼 누르면 기존 데이터를 담는 함수
 */

export const setPrevData = (param: PrevDataType) =>
  usePlatFormState.setState(state => ({
    ...state,
    prevData: { ...state.prevData, ...param },
    editPlatForm: { ...state.editPlatForm, ...param },
    prevImg: param.image_url ?? null,
  }));

export const setPrevImg = (url: string) =>
  usePlatFormState.setState(state => ({
    ...state,
    prevImg: url ?? null,
  }));

/**
 *
 * @param mode false 면 카드 등록 할 때 file true면 편집할 때 file을 초기화
 */
export const resetPlatFormFile = (mode: boolean) => {
  if (!mode) {
    usePlatFormState.setState(state => ({
      ...state,
      addPlatForm: { ...state.addPlatForm, file: null },
    }));
  }
  if (mode) {
    usePlatFormState.setState(state => ({
      ...state,
      editPlatForm: { ...state.editPlatForm, file: null, image_url: null },
    }));
  }
};

export const resetPrevImg = () =>
  usePlatFormState.setState(state => ({
    ...state,
    prevImg: null,
  }));

/**
 * 모달을 닫을 때, platFormCard를 Add, Edit할 때 사용
 * @param mode isEdit 값입니다.
 */
export const handleResetStateAfterAction = (mode: boolean) => {
  // edit이 아닐 때
  if (!mode) {
    usePlatFormState.setState(state => ({
      ...state,
      addPlatForm: { ...state.addPlatForm, name: '', link_url: '', file: null, metaImage: null },
      prevImg: initialPrevImg,
      isRegist: false,
    }));
  }
  // edit일 때
  if (mode) {
    usePlatFormState.setState(state => ({
      ...state,
      editPlatForm: { ...state.editPlatForm, name: '', link_url: '', file: null },
      isRegist: false,
      prevImg: initialPrevImg,
      prevData: initialPrevData,
      isEdit: false,
    }));
  }
};

/**
 * 데이터 삭제 후 호출되는 reset 함수
 */
export const handleResetStateAfterRemoveData = () =>
  usePlatFormState.setState(state => ({
    ...state,
    isRegist: false,
    editPlatForm: { ...state.editPlatForm, name: '', link_url: '', file: null },
  }));

/**
 * PlatFormWrapper에서 사용되는 것
 */
export const allResetPlatFormState = () =>
  usePlatFormState.setState(state => ({
    ...state,
    addPlatForm: initialAddPlatform,
    editPlatForm: initialEditPlatForm,
    isEdit: false,
    isRegist: false,
    prevData: initialPrevData,
    prevImg: initialPrevImg,
    store_id: null,
  }));
