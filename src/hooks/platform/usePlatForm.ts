import { downloadPlatFormImageUrl, insertPlatFormRow, uploadPlatFormImage } from '@/server/api/supabase/platform';
import usePlatFormStore, { resetAddPlatForm, setAddDataToFetchPlatForm, setIsRegist } from '@/shared/store/platform';
import { AddPlatFormType } from '@/types/platform';
import moment from 'moment';
import { FormEvent } from 'react';

const usePlatForm = () => {
  const addPlatform = usePlatFormStore(state => state.addPlatForm);

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // image 경로로 사용하기 위해 createdAt를 넣었습니다.
    let updateData: AddPlatFormType = { ...addPlatform, createdAt: moment().toISOString() };

    /**useModal 사용하기 */
    if (!addPlatform.name.trim() || !addPlatform.link_url.trim()) return alert('써라');

    if (updateData.file) {
      await uploadPlatFormImage(updateData);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(updateData);
      updateData = {
        ...addPlatform,
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

  const closeAddFormModal = () => {
    setIsRegist(false);
    resetAddPlatForm();
  };

  return {
    submitAddCard,
    closeAddFormModal,
  };
};

export default usePlatForm;
