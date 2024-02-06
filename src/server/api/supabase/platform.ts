//platform.ts

import { supabase } from '@/shared/supabase';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';

export const uploadPlatFormImage = async (param: AddPlatFormType | EditPlatFormType) => {
  const { data, error } = await supabase.storage
    .from('images')
    .upload(`platform/${param.store_id}/${param.createdAt}`, param.file!);

  if (error) throw error;
  return { data, error };
};

export const downloadPlatFormImageUrl = (param: AddPlatFormType | EditPlatFormType) => {
  try {
    const { data } = supabase.storage.from('images').getPublicUrl(`platform/${param.store_id}/${param.createdAt}`);

    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const insertPlatFormRow = async (param: AddPlatFormType | EditPlatFormType) => {
  const { data, error } = await supabase
    .from('platform')
    .insert([
      {
        image_url: param.image_url,
        store_id: param.store_id!,
        name: param.name,
        link_url: param.link_url,
      },
    ])
    .select();
  if (error) return { data: null, error };

  return { data, error };
};

export const fetchPlatForm = async (store_id: string) => {
  const { data: platform, error } = await supabase
    .from('platform')
    .select('*')
    .eq('store_id', store_id)
    .order('created_at', { ascending: true });

  if (error) return { platform: [], error };

  return { platform, error };
};

export const removePlatFormImage = async (param: EditPlatFormType) => {
  if (!param.image_url) return;
  const imagePath = param?.image_url?.split('/').slice(-1)[0];
  await supabase.storage.from('images').remove([`platform/${param.store_id}/${imagePath}`]);
};

/**
 * spread를 사용하여 update 되는 것만 하도록 했습니다.
 * @param param
 * @returns update 성공하면 data는 null 값이기에 [] 배열로 넣었씁니다.
 */
export const updatePlatFormData = async (param: EditPlatFormType) => {
  const { store_id, metaImage, file, createdAt, ...editForm } = param;
  const { error } = await supabase
    .from('platform')
    .update({
      ...editForm,
    })
    .eq('id', param.id!);

  if (error) return { data: null, error };
  return { data: [], error };
};

export const removePlatFormData = async (id: string) => {
  const { error } = await supabase.from('platform').delete().eq('id', id);
};
