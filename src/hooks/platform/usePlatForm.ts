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
} from '@/shared/store/platform';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import { TablesInsert } from '@/types/supabase';
import moment from 'moment';
import { FormEvent } from 'react';
const SUPABASE_STORAGE_URL = 'https://lajnysuklrkrhdyqhotr.supabase.co';
const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg, store_id, meta } = usePlatFormState();

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // image 경로로 사용하기 위해 createdAt를 넣었습니다.
    let updateData: AddPlatFormType = { ...addPlatForm, createdAt: moment().toISOString() };

    /**useModal 사용하기 */
    if (!addPlatForm.name.trim() || !addPlatForm.link_url.trim()) return alert('써라');
    if (meta) {
      updateData = {
        ...addPlatForm,
        image_url: addPlatForm.metaImage!,
      };
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    }
    if (updateData.file) {
      await uploadPlatFormImage(updateData);
      const { publicUrl: image_url } = downloadPlatFormImageUrl(updateData);
      updateData = {
        ...addPlatForm,
        image_url,
      };
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    } else if (!meta) {
      const { data } = await insertPlatFormRow(updateData);
      setAddDataToFetchPlatForm(data!);
    }
    resetAddPlatForm();
    setIsRegist(false);
    resetMeta();
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

  const submitEditCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editData: EditPlatFormType = {
      ...editPlatForm,
    };

    let comparedData = Object.entries(editData).reduce((acc, [key, value]) => {
      if (prevData[key as keyof EditPlatFormType] !== value) {
        acc[key as keyof EditPlatFormType] = value;
      }
      if (prevData.image_url) acc['image_url'] = prevData.image_url;
      return acc;
    }, new Object() as EditPlatFormType);

    if (isEmptyObject(comparedData) && prevData.image_url === prevImg) {
      resetIsRegist();
      resetEditPlatForm();
      resetPrevData();
      return;
    }

    comparedData.id = editData.id;
    comparedData.store_id = editData.store_id;
    comparedData.createdAt;
    if (meta) {
      // 기존 이미지가 있고 이미지 변경 했을 때
      if (prevData.image_url) {
        if (prevData.image_url.includes(SUPABASE_STORAGE_URL)) {
          //  opengraph 이미지가 아니면 삭제
          await removePlatFormImage(prevData);
        }
        const { file, createdAt, metaImage, ...updateTarget } = comparedData;
        const data = { ...updateTarget, image_url: metaImage };
        await updatePlatFormData(data as TablesInsert<'platform'>);
        const { platform } = await fetchPlatForm(store_id!);
        setFetchPlatFormData(platform);
        resetIsRegist();
        resetEditPlatForm();
        resetPrevData();
        return;
      }
      //기존 이미지가 없고 meta이미지만을 등록 할 때
      if (!prevData.image_url) {
        const { file, createdAt, metaImage, ...updateTarget } = comparedData;

        const data = { ...updateTarget, image_url: metaImage };
        await updatePlatFormData(data as TablesInsert<'platform'>);
        const { platform } = await fetchPlatForm(store_id!);
        setFetchPlatFormData(platform);
        resetIsRegist();
        resetEditPlatForm();
        resetPrevData();
        return;
      }
    }
    if (!meta) {
      // 기존이미지가 있고 이미지 변경 했을 때
      if (prevData.image_url && comparedData.file) {
        comparedData.createdAt = moment().toISOString();

        if (prevData.image_url.includes(SUPABASE_STORAGE_URL)) {
          //  opengraph 이미지가 아니면 삭제
          await removePlatFormImage(prevData);
        }

        // 새로운 이미지 업로드
        await uploadPlatFormImage(comparedData);
        const { publicUrl: image_url } = downloadPlatFormImageUrl(comparedData);
        comparedData = {
          ...comparedData,
          image_url,
        };

        const { file, createdAt, ...updateTarget } = comparedData;
        await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
        const { platform } = await fetchPlatForm(store_id!);
        setFetchPlatFormData(platform);
        resetIsRegist();
        resetEditPlatForm();
        resetPrevData();
        return;
      }

      // 기존데이터에 이미지가 없을 때 이미지 등록을 할 때
      if (!prevData.image_url && comparedData.file) {
        comparedData.createdAt = moment().toISOString();
        await uploadPlatFormImage(comparedData);
        const { publicUrl: image_url } = downloadPlatFormImageUrl(comparedData);
        comparedData = {
          ...comparedData,
          image_url,
        };
        const { file, createdAt, ...updateTarget } = comparedData;
        await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
      }

      // 수정할 때 이미지만 삭제 할 때 실행 되는 조건문
      if (!prevImg && !comparedData.link_url && !comparedData.name) {
        // 수정할 이미지가 meta이미지이면
        if (!prevData?.image_url!.includes(SUPABASE_STORAGE_URL)) {
          const { file, createdAt, ...updateTarget } = comparedData;
          await updatePlatFormData({ ...updateTarget, image_url: null } as TablesInsert<'platform'>);
          const { platform, error } = await fetchPlatForm(store_id!);
          setFetchPlatFormData(platform);
          resetIsRegist();
          resetEditPlatForm();
          resetPrevData();
          return;
        }
        // 수정할 이미지가 storage 이미지 이면
        if (prevData?.image_url!.includes(SUPABASE_STORAGE_URL)) {
          await removePlatFormImage(comparedData);
          const { file, createdAt, ...updateTarget } = comparedData;
          await updatePlatFormData({ ...updateTarget, image_url: null } as TablesInsert<'platform'>);
          const { platform, error } = await fetchPlatForm(store_id!);
          setFetchPlatFormData(platform);
          resetIsRegist();
          resetEditPlatForm();
          resetPrevData();
          return;
        }
      }
    }
    const { file, createdAt, ...updateTarget } = comparedData;
    await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
    const { platform } = await fetchPlatForm(store_id!);
    setFetchPlatFormData(platform);
    resetIsRegist();
    resetEditPlatForm();
    resetPrevData();
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
