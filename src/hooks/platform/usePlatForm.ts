import { ensureHttpsUrl } from '@/components/platform/utility/platformHelper';
import { isEmptyObject } from '@/shared/helper';
import usePlatFormState, {
  resetAddPlatForm,
  resetEditPlatForm,
  resetIsRegist,
  resetPrevData,
  resetPrevImg,
  setIsRegist,
} from '@/shared/store/platform';
import { EditPlatFormType } from '@/types/platform';
import { FormEvent } from 'react';
import usePlatFormSetQuery from '../query/platform/usePlatFormSetQuery';
import useToast from '../service/ui/useToast';
import { handleImageUpload, isPlatFormCardValueChange, prevImageRemove } from './usePlatFormHelper';
const SUPABASE_STORAGE_URL = 'https://lajnysuklrkrhdyqhotr.supabase.co';
interface PlatformToast {
  content: string;
  type: 'info' | 'warn';
}
const EDIT_TOAST = { content: '수정이 완료 되었습니다.', type: 'info' } as const;
const ALERT_TOAST = { content: '내용을 다 채워주세요', type: 'warn' } as const;

const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg } = usePlatFormState();
  const { addCardToPlatForm, editCardPlatForm, removeCardPlatForm } = usePlatFormSetQuery();

  const { toast } = useToast();

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
    addCardToPlatForm(form);

    resetAddPlatForm();
    setIsRegist(false);
    resetPrevImg();
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
    editCardPlatForm(form as EditPlatFormType);

    resetIsRegist();
    resetEditPlatForm();
    resetPrevData();
    resetPrevImg();
    showCompleteToast(EDIT_TOAST);
  };

  const clickRemoveData = async () => {
    prevImageRemove(editPlatForm);
    removeCardPlatForm(editPlatForm.id);
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
