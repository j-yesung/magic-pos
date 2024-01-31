import { ensureHttpsUrl } from '@/components/platform/utility/platformHelper';
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
  resetPrevData,
  resetPrevImg,
  setAddDataToFetchPlatForm,
  setFetchPlatFormData,
  setIsRegist,
} from '@/shared/store/platform';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import dayjs from 'dayjs';
import { FormEvent } from 'react';
import useToast from '../service/ui/useToast';
const SUPABASE_STORAGE_URL = 'https://lajnysuklrkrhdyqhotr.supabase.co';
interface PlatformToast {
  content: string;
  type: 'info' | 'warn';
}
const EDIT_TOAST = { content: '수정이 완료 되었습니다.', type: 'info' } as const;
const ALERT_TOAST = { content: '내용을 다 채워주세요', type: 'warn' } as const;

const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg } = usePlatFormState();

  const { toast } = useToast();
  // 링크 유효성 검사

  const handleImageUpload = async (data: AddPlatFormType | EditPlatFormType) => {
    if (data.file) {
      data.createdAt = dayjs().toISOString();
      await uploadPlatFormImage(data);
      const { publicUrl } = downloadPlatFormImageUrl(data);
      data.image_url = publicUrl;
      return data;
    }
    data.image_url = data.metaImage ?? null;
    return data;
  };

  const showCompleteToast = (alert: PlatformToast) => {
    toast(alert.content, {
      type: alert.type,
      position: 'top-center',
      showCloseButton: true,
      autoClose: 2000,
    });
  };

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!addPlatForm.name.trim() || !addPlatForm.link_url.trim()) {
      return showCompleteToast(ALERT_TOAST);
    }
    const ensureHttpsUrlData = ensureHttpsUrl(addPlatForm);
    const form = await handleImageUpload(ensureHttpsUrlData);
    const { data: platformData } = await insertPlatFormRow(form);
    setAddDataToFetchPlatForm(platformData!);
    resetAddPlatForm();
    setIsRegist(false);
    resetPrevImg();
  };

  const isPlatFormCardValueChange = (preValue: EditPlatFormType, editValue: EditPlatFormType) => {
    const isChangeValue = Object.entries(editValue).reduce((acc, [key, value]) => {
      if (preValue[key as keyof EditPlatFormType] !== value) {
        acc[key as keyof EditPlatFormType] = value;
      }
      return acc;
    }, new Object() as EditPlatFormType);
    return isChangeValue;
  };

  const prevImageRemove = async (prevData: EditPlatFormType) => {
    if (prevData.image_url?.includes(SUPABASE_STORAGE_URL)) {
      await removePlatFormImage(prevData);
    }
    return;
  };

  const submitEditCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const comparedData = isPlatFormCardValueChange(prevData, editPlatForm);

    if (isEmptyObject(comparedData) && prevData.image_url === prevImg) {
      resetIsRegist();
      resetEditPlatForm();
      resetPrevData();
      resetPrevImg();
      return;
    }

    comparedData.id = editPlatForm.id;
    comparedData.store_id = editPlatForm.store_id;

    await prevImageRemove(prevData);
    const ensureHttpsUrlData = ensureHttpsUrl(comparedData);
    const form = await handleImageUpload(ensureHttpsUrlData);

    await updatePlatFormData(form as EditPlatFormType);
    const { platform } = await fetchPlatForm(form.store_id!);
    setFetchPlatFormData(platform);
    resetIsRegist();
    resetEditPlatForm();
    resetPrevData();
    resetPrevImg();
    showCompleteToast(EDIT_TOAST);
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
