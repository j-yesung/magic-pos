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
import moment from 'moment';
import { FormEvent } from 'react';
import useToast from '../service/ui/useToast';
const SUPABASE_STORAGE_URL = 'https://lajnysuklrkrhdyqhotr.supabase.co';
const HTTPS = 'https://';
const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg, store_id, meta } = usePlatFormState();

  const { toast } = useToast();
  // 링크 유효성 검사
  const checkValidUrl = (url: string) => {
    const regUrl = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regUrl.test(url);
  };

  const checkHttp = (url: string) => {
    if (url.includes('https://')) return url;
    if (!url.includes('https://')) return HTTPS + url;
  };

  const submitAddCard = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // image 경로로 사용하기 위해 createdAt를 넣었습니다.
    let updateData: AddPlatFormType = { ...addPlatForm, createdAt: moment().toISOString() };
    const validHttpUrl = checkHttp(addPlatForm.link_url);
    const isValidUrl = checkValidUrl(validHttpUrl!);

    if (!isValidUrl) {
      setIsValidUrl(false);
      e.currentTarget['link_url'].value = '';
      return;
    }
    /**useModal 사용하기 */
    if (!addPlatForm.name.trim() || !addPlatForm.link_url.trim())
      return toast('내용을 다 채워주세요', {
        type: 'info',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 3000,
      });
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

    if (comparedData.link_url) comparedData.id = editData.id;
    comparedData.store_id = editData.store_id;
    comparedData.createdAt;
    comparedData.id = editData.id;
    if (meta) {
      console.log('meta');
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
        toast('수정이 완료 되었습니다.', {
          type: 'info',
          position: 'top-center',
          showCloseButton: true,
          autoClose: 300,
        });
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
        toast('수정이 완료 되었습니다.', {
          type: 'info',
          position: 'top-center',
          showCloseButton: true,
          autoClose: 300,
        });
        return;
      }
    }
    if (!meta) {
      console.log('!meta');
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
        toast('수정이 완료 되었습니다.', {
          type: 'info',
          position: 'top-center',
          showCloseButton: true,
          autoClose: 300,
        });
        return;
      }

      // 기존데이터에 이미지가 없을 때 이미지 등록을 할 때
      if (!prevData.image_url && comparedData.file) {
        console.log('여기에 오니?');
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
        console.log('여기에 오니?');
        // 수정할 이미지가 meta이미지이면
        if (!prevData?.image_url?.includes(SUPABASE_STORAGE_URL)) {
          const { file, createdAt, ...updateTarget } = comparedData;
          console.log(updateTarget);
          await updatePlatFormData({ ...updateTarget, image_url: null } as TablesInsert<'platform'>);
          const { platform, error } = await fetchPlatForm(store_id!);
          setFetchPlatFormData(platform);
          resetIsRegist();
          resetEditPlatForm();
          resetPrevData();
          toast('수정이 완료 되었습니다.', {
            type: 'info',
            position: 'top-center',
            showCloseButton: true,
            autoClose: 300,
          });
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
          toast('수정이 완료 되었습니다.', {
            type: 'info',
            position: 'top-center',
            showCloseButton: true,
            autoClose: 300,
          });
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
    toast('수정이 완료 되었습니다.', {
      type: 'info',
      position: 'top-center',
      showCloseButton: true,
      autoClose: 300,
    });
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
