import { supabase } from '@/shared/supabase';
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
