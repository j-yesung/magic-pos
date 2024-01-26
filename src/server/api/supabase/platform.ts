//platform.ts

import { supabase } from '@/shared/supabase';
import { AddPlatFormType, EditPlatFormType } from '@/types/platform';
import { TablesInsert } from '@/types/supabase';

/**
 *
 */
/**
interface GetPlatFormReturn {
  platform: TablesInsert<'platform'>[];
  error?: PostgrestError;
}

type AddPlatFormType = (param: TablesInsert<'platform'>) => Promise<GetPlatFormReturn>;

 * 안되는 이유 나중에 찾기
 * @param param 
 * @returns 
 */
// export const addPlatForm: AddPlatFormType = async param => {
//   const { data: platform, error } = await supabase
//     .from('platform')
//     .insert([
//       {
//         name: param.name,
//         link_url: param.link_url,
//         image_url: param.image_url,
//         store_id: param.store_id,
//       },
//     ])
//     .select();

//   if (error) {
//     return {
//       platform: [],
//       error,
//     };
//   }

//   return { platform, error };
// };

export const addPlatForm = async (param: TablesInsert<'platform'>) => {
  const { data: platform, error } = await supabase
    .from('platform')
    .insert([
      {
        name: param.name,
        link_url: param.link_url,
        image_url: param.image_url,
        store_id: param.store_id,
      },
    ])
    .select();

  if (error) {
    return {
      platform: [],
      error,
    };
  }

  return { platform, error };
};

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
  console.log(store_id);
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
  const { error, data } = await supabase.storage.from('images').remove([`platform/${param.store_id}/${imagePath}`]);
};

/**
 *
 * @param param
 * @returns update 성공하면 data는 null 값이기에 [] 배열로 넣었씁니다.
 */
export const updatePlatFormData = async (param: TablesInsert<'platform'>) => {
  const { data, error } = await supabase
    .from('platform')
    .update({
      ...param,
    })
    .eq('id', param.id!);

  if (error) return { data: null, error };
  return { data: [], error };
};

export const removePlatFormData = async (id: string) => {
  const { error } = await supabase.from('platform').delete().eq('id', id);
};
