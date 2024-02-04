import { ensureHttpsUrl } from '@/components/platform/utility/usePlatformHelper';
import { isEmptyObject } from '@/shared/helper';
import usePlatFormState, {
  handleResetStateAfterAction,
  handleResetStateAfterRemoveData,
} from '@/shared/store/platform';
import { EditPlatFormType } from '@/types/platform';
import { FormEvent, useEffect, useState } from 'react';
import usePlatFormSetQuery from '../query/platform/usePlatFormSetQuery';
import useToast from '../service/ui/useToast';
import { handleImageUpload, isPlatFormCardValueChange, prevImageRemove } from './usePlatFormHelper';

interface PlatformToast {
  content: string;
  type: 'info' | 'warn';
}
const EDIT_TOAST = { content: '수정이 완료 되었습니다.', type: 'info' } as const;
const ALERT_TOAST = { content: '내용을 다 채워주세요', type: 'warn' } as const;

const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg, isEdit } = usePlatFormState();
  const { addCardToPlatForm, editCardPlatForm, removeCardPlatForm, editPending } = usePlatFormSetQuery();
  const [pending, setPending] = useState<boolean>(false);
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
    // react-query mutation
    addCardToPlatForm(form);

    handleResetStateAfterAction(isEdit);
  };

  const submitEditCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(editPlatForm);
    const comparedData = isPlatFormCardValueChange(prevData, editPlatForm);
    if (isEmptyObject(comparedData) && prevData.image_url === prevImg) {
      handleResetStateAfterAction(isEdit);
      return;
    }

    comparedData.id = editPlatForm.id;
    comparedData.store_id = editPlatForm.store_id;
    await prevImageRemove(prevData);
    const ensureHttpsUrlData = ensureHttpsUrl(comparedData);
    const form = await handleImageUpload(ensureHttpsUrlData);

    console.log('🚀 ~ submitEditCard ~ form:', form);
    // react-query mutation
    editCardPlatForm(form as EditPlatFormType);
    setPending(true);
  };

  const clickRemoveData = async () => {
    prevImageRemove(editPlatForm);
    // react-query mutation
    removeCardPlatForm(editPlatForm.id);
    // reset state
    handleResetStateAfterRemoveData();
  };

  const closePlatFormModal = (mode: boolean) => {
    handleResetStateAfterAction(mode);
  };

  useEffect(() => {
    if (!editPending && pending) {
      console.log('???');
      // platform state 초기
      handleResetStateAfterAction(isEdit);
      // toast
      showCompleteToast(EDIT_TOAST);
      setPending(false);
    }
  }, [editPending]);

  return {
    submitAddCard,
    closePlatFormModal,
    clickRemoveData,
    submitEditCard,
    showCompleteToast,
    editCardPlatForm,
    editPending,
  };
};

export default usePlatForm;
