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

const usePlatForm = () => {
  const { addPlatForm, editPlatForm, prevData, prevImg, store_id, meta } = usePlatFormState();

  const { toast } = useToast();
  // 링크 유효성 검사

  const handleImageUpload = async (data: AddPlatFormType | EditPlatFormType) => {
    if (data.file) {
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

    // image 경로로 사용하기 위해 createdAt를 넣었습니다.
    let updateData: AddPlatFormType = { ...addPlatForm, createdAt: moment().toISOString() };

    if (!addPlatForm.name.trim() || !addPlatForm.link_url.trim()) {
      return toast('내용을 다 채워주세요', {
        type: 'info',
        position: 'top-center',
        showCloseButton: false,
        autoClose: 3000,
      });
    }

    const imageUrl = await handleImageUpload(updateData);

    updateData = { ...updateData, image_url: imageUrl };
    console.log(updateData);
    const { data: platformData } = await insertPlatFormRow(updateData);
    setAddDataToFetchPlatForm(platformData!);

    resetAddPlatForm();
    setIsRegist(false);
    resetMeta();
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

    // const isValidUrl = validateUrl(e, comparedData.link_url);

    // if (!isValidUrl) return;

    const imageUrl = await handleImageUpload(comparedData);
    comparedData = {
      ...comparedData,
      image_url: imageUrl ?? null,
      store_id: editPlatForm.store_id,
      id: editPlatForm.id,
    };

    console.log('comparedData', comparedData);
    const { store_id, ...editTarget } = comparedData;
    await updatePlatFormData(editTarget as TablesInsert<'platform'>);
    const { platform } = await fetchPlatForm(comparedData.store_id!);
    setFetchPlatFormData(platform);
    resetIsRegist();
    resetEditPlatForm();
    resetPrevData();
    showEditCompleteToast();

    // if (meta) {
    //   // 기존 이미지가 있고 이미지 변경 했을 때
    //   if (prevData.image_url) {
    //     if (prevData.image_url.includes(SUPABASE_STORAGE_URL)) {
    //       //  opengraph 이미지가 아니면 삭제
    //       await removePlatFormImage(prevData);
    //     }
    //     const { file, createdAt, metaImage, ...updateTarget } = comparedData;
    //     const data = { ...updateTarget, image_url: metaImage };
    //     await updatePlatFormData(data as TablesInsert<'platform'>);
    //     const { platform } = await fetchPlatForm(store_id!);
    //     setFetchPlatFormData(platform);
    //     resetIsRegist();
    //     resetEditPlatForm();
    //     resetPrevData();
    //     showEditCompleteToast();
    //     return;
    //   }
    //   //기존 이미지가 없고 meta이미지만을 등록 할 때
    //   if (!prevData.image_url) {
    //     const { file, createdAt, metaImage, ...updateTarget } = comparedData;

    //     const data = { ...updateTarget, image_url: metaImage };
    //     await updatePlatFormData(data as TablesInsert<'platform'>);
    //     const { platform } = await fetchPlatForm(store_id!);
    //     setFetchPlatFormData(platform);
    //     resetIsRegist();
    //     resetEditPlatForm();
    //     resetPrevData();
    //     showEditCompleteToast();

    //     return;
    //   }
    // }
    // if (!meta) {
    //   // 기존이미지가 있고 이미지 변경 했을 때
    //   if (prevData.image_url && comparedData.file) {
    //     comparedData.createdAt = moment().toISOString();

    //     if (prevData.image_url.includes(SUPABASE_STORAGE_URL)) {
    //       //  opengraph 이미지가 아니면 삭제
    //       await removePlatFormImage(prevData);
    //     }

    //     // 새로운 이미지 업로드
    //     await uploadPlatFormImage(comparedData);
    //     const { publicUrl: image_url } = downloadPlatFormImageUrl(comparedData);
    //     comparedData = {
    //       ...comparedData,
    //       image_url,
    //     };

    //     const { file, createdAt, ...updateTarget } = comparedData;
    //     await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
    //     const { platform } = await fetchPlatForm(store_id!);
    //     setFetchPlatFormData(platform);
    //     resetIsRegist();
    //     resetEditPlatForm();
    //     resetPrevData();
    //     showEditCompleteToast();

    //     return;
    //   }

    //   // 기존데이터에 이미지가 없을 때 이미지 등록을 할 때
    //   if (!prevData.image_url && comparedData.file) {
    //     console.log('여기에 오니?');
    //     comparedData.createdAt = moment().toISOString();
    //     await uploadPlatFormImage(comparedData);
    //     const { publicUrl: image_url } = downloadPlatFormImageUrl(comparedData);
    //     comparedData = {
    //       ...comparedData,
    //       image_url,
    //     };
    //     const { file, createdAt, ...updateTarget } = comparedData;
    //     await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
    //   }

    //   // 수정할 때 이미지만 삭제 할 때 실행 되는 조건문
    //   if (!prevImg && !comparedData.link_url && !comparedData.name) {
    //     // 수정할 이미지가 meta이미지이면
    //     if (!prevData?.image_url?.includes(SUPABASE_STORAGE_URL)) {
    //       const { file, createdAt, ...updateTarget } = comparedData;
    //       console.log(updateTarget);
    //       await updatePlatFormData({ ...updateTarget, image_url: null } as TablesInsert<'platform'>);
    //       const { platform, error } = await fetchPlatForm(store_id!);
    //       setFetchPlatFormData(platform);
    //       resetIsRegist();
    //       resetEditPlatForm();
    //       resetPrevData();
    //       showEditCompleteToast();

    //       return;
    //     }
    //     // 수정할 이미지가 storage 이미지 이면
    //     if (prevData?.image_url!.includes(SUPABASE_STORAGE_URL)) {
    //       await removePlatFormImage(comparedData);
    //       const { file, createdAt, ...updateTarget } = comparedData;
    //       await updatePlatFormData({ ...updateTarget, image_url: null } as TablesInsert<'platform'>);
    //       const { platform, error } = await fetchPlatForm(store_id!);
    //       setFetchPlatFormData(platform);
    //       resetIsRegist();
    //       resetEditPlatForm();
    //       resetPrevData();
    //       showEditCompleteToast();

    //       return;
    //     }
    //   }
    // }

    // const { file, createdAt, ...updateTarget } = comparedData;
    // await updatePlatFormData(updateTarget as TablesInsert<'platform'>);
    // const { platform } = await fetchPlatForm(store_id!);
    // setFetchPlatFormData(platform);
    // resetIsRegist();
    // resetEditPlatForm();
    // resetPrevData();
    // showEditCompleteToast();
  };

  const clickRemoveData = async () => {
    console.log(editPlatForm);
    await removePlatFormData(editPlatForm.id);
    if (editPlatForm.image_url?.includes(process.env.NEXT_PUBLIC_SUPABASE_URL!)) {
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
