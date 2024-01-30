import {
  downloadPlatFormImageUrl,
  fetchPlatForm,
  insertPlatFormRow,
  removePlatFormData,
  removePlatFormImage,
  updatePlatFormData,
  uploadPlatFormImage,
} from '@/server/api/supabase/platform';
import { isEmptyObject } from '@/shared/helper';
import usePlatFormState, {
  resetAddPlatForm,
  resetEditPlatForm,
  resetIsRegist,
  resetMeta,
  resetPrevData,
  resetPrevImg,
  setAddDataToFetchPlatForm,
  setFetchPlatFormData,
  setIsRegist,
  setIsValidUrl,
} from '@/shared/store/platform';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import { TablesInsert } from '@/types/supabase';
import { checkHttp, checkValidUrl } from '@/utils/validate';
import moment from 'moment';
import { FormEvent } from 'react';
import useToast from '../service/ui/useToast';
const SUPABASE_STORAGE_URL = 'https://lajnysuklrkrhdyqhotr.supabase.co';

const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg } = usePlatFormState();

  const { toast } = useToast();
  // 링크 유효성 검사

  const handleImageUpload = async (data: AddPlatFormType | EditPlatFormType) => {
    if (data.file) {
      data.createdAt = moment().toISOString();
      await uploadPlatFormImage(data);
      const { publicUrl } = downloadPlatFormImageUrl(data);
      return publicUrl;
    }
    return data.metaImage ?? undefined;
  };

  const showEditCompleteToast = () => {
    toast('수정이 완료 되었습니다.', {
      type: 'info',
      position: 'top-center',
      showCloseButton: true,
      autoClose: 300,
    });
  };

  const validateUrl = (e: FormEvent<HTMLFormElement>, url: string): boolean => {
    const validHttpUrl = checkHttp(url);
    const isValidUrl = checkValidUrl(validHttpUrl!);

    if (!isValidUrl) {
      setIsValidUrl(false);
      e.currentTarget['link_url'].value = '';
      return false;
    }

    return true;
  };

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const isValidUrl = validateUrl(e, addPlatForm.link_url);

    if (!isValidUrl) return;

    if (!addPlatForm.name.trim() || !addPlatForm.link_url.trim()) {
      return toast('내용을 다 채워주세요', {
        type: 'info',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 3000,
      });
    }

    const imageUrl = await handleImageUpload(addPlatForm);

    addPlatForm.image_url = imageUrl;
    const { data: platformData } = await insertPlatFormRow(addPlatForm);
    setAddDataToFetchPlatForm(platformData!);
    resetAddPlatForm();
    setIsRegist(false);
    resetMeta();
  };

  const prevImageRemove = async (prevData: EditPlatFormType) => {
    if (prevData.image_url?.includes(SUPABASE_STORAGE_URL)) {
      await removePlatFormImage(prevData);
    }
    return;
  };

  const submitEditCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let comparedData = Object.entries(editPlatForm).reduce((acc, [key, value]) => {
      if (prevData[key as keyof EditPlatFormType] !== value) {
        acc[key as keyof EditPlatFormType] = value;
      }
      // 튜터님께 여쭤볼 주석
      // if (prevData.image_url) acc['image_url'] = prevData.image_url;
      return acc;
    }, new Object() as EditPlatFormType);

    if (isEmptyObject(comparedData) && prevData.image_url === prevImg) {
      resetIsRegist();
      resetEditPlatForm();
      resetPrevData();
      return;
    }

    comparedData.id = editPlatForm.id;
    comparedData.store_id = editPlatForm.store_id;
    // const isValidUrl = validateUrl(e, comparedData.link_url);

    // if (!isValidUrl) return;
    await prevImageRemove(prevData);
    const imageUrl = await handleImageUpload(comparedData);
    comparedData = {
      ...comparedData,
      image_url: imageUrl ?? null,
    };

    const { store_id, metaImage, file, createdAt, ...editTarget } = comparedData;
    await updatePlatFormData(editTarget as TablesInsert<'platform'>);
    const { platform } = await fetchPlatForm(store_id!);
    setFetchPlatFormData(platform);
    resetIsRegist();
    resetEditPlatForm();
    resetPrevData();
    showEditCompleteToast();
  };

  const clickRemoveData = async () => {
    await removePlatFormData(editPlatForm.id);
    if (editPlatForm.image_url?.includes(SUPABASE_STORAGE_URL)) {
      await removePlatFormImage(editPlatForm);
    }
    const { platform } = await fetchPlatForm(editPlatForm.store_id!);
    setFetchPlatFormData(platform);
    resetIsRegist();
    resetEditPlatForm();
  };

  const closePlatFormModal = (mode: boolean) => {
    if (!mode) {
      resetAddPlatForm();
    }
    if (mode) {
      resetEditPlatForm();
    }

    resetPrevImg();
    resetMeta();
    resetIsRegist();
  };

  return {
    submitAddCard,
    closePlatFormModal,
    clickRemoveData,
    submitEditCard,
  };
};

export default usePlatForm;
