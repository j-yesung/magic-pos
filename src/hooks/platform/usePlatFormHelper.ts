import { downloadPlatFormImageUrl, removePlatFormImage, uploadPlatFormImage } from '@/server/api/supabase/platform';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import dayjs from 'dayjs';

/**
 * 카드 편집할 때 supabase storage에 올린 이미지이면 삭제
 * @param data
 * @returns
 */
export const prevImageRemove = async (data: EditPlatFormType) => {
  if (data.image_url?.includes(`${process.env.NEXT_PUBLIC_SUPABASE_URL}`)) {
    await removePlatFormImage(data);
  }
  return;
};

/**
 * 이미지가 openMeta에서 추출한 거인지 아니면 직접 파일을 업로드 한건지에 따른
 * 이미지 로직
 * @param data
 * @returns
 */
export const handleImageUpload = async (data: AddPlatFormType | EditPlatFormType) => {
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

/**
 * platForm 카드 수정할 때
 * 이전 데이터와 현재 편집된 데이터가 같은지 비교하는 함수
 * @param preValue
 * @param editValue
 * @returns
 */
export const isPlatFormCardValueChange = (preValue: EditPlatFormType, editValue: EditPlatFormType) => {
  const isChangeValue = Object.entries(editValue).reduce((acc, [key, value]) => {
    if (preValue[key as keyof EditPlatFormType] !== value) {
      acc[key as keyof EditPlatFormType] = value;
    }
    return acc;
  }, new Object() as EditPlatFormType);
  return isChangeValue;
};
