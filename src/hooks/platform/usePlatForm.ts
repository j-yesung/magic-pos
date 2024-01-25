import {
  downloadPlatFormImageUrl,
  fetchPlatForm,
  insertPlatFormRow,
  removePlatFormData,
  removePlatFormImage,
  uploadPlatFormImage,
} from '@/server/api/supabase/platform';
import usePlatFormStore, {
  resetAddPlatForm,
  resetEditPlatForm,
  resetIsRegist,
  setAddDataToFetchPlatForm,
  setFetchPlatFormData,
  setIsRegist,
} from '@/shared/store/platform';
import { AddPlatFormType } from '@/types/platform';
import moment from 'moment';
import { FormEvent } from 'react';

const usePlatForm = () => {
  const { addPlatForm, editPlatForm } = usePlatFormStore();

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // image 경로로 사용하기 위해 createdAt를 넣었습니다.
    let updateData: AddPlatFormType = { ...addPlatForm, createdAt: moment().toISOString() };

    /**useModal 사용하기 */
    if (!addPlatForm.name.trim() || !addPlatForm.link_url.trim()) return alert('써라');

    if (updateData.file) {
      await uploadPlatFormImage(updateData);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(updateData);
      updateData = {
        ...addPlatForm,
        image_url,
      };
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    } else {
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    }
    resetAddPlatForm();
    setIsRegist(false);
  };
  const clickRemoveData = async () => {
    await removePlatFormData(editPlatForm.id);
    await removePlatFormImage(editPlatForm);
    const { platform } = await fetchPlatForm(editPlatForm.store_id!);
    setFetchPlatFormData(platform);
    resetIsRegist();
    resetEditPlatForm();
  };

  const closePlatFormModal = (mode: boolean) => {
    if (!mode) {
      resetIsRegist();
      resetAddPlatForm();
    }
    if (mode) {
      resetIsRegist();
      resetEditPlatForm();
    }
  };

  return {
    submitAddCard,
    closePlatFormModal,
    clickRemoveData,
  };
};

export default usePlatForm;
