import { PLATFORM_PATH } from '@/data/url-list';
import { insertPlatFormRow, removePlatFormData, updatePlatFormData } from '@/server/api/supabase/platform';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { PlatFormQueryKey } from './platformQueryKey';

const usePlatFormSetQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const addPlatFormCardMutation = useMutation({
    mutationFn: insertPlatFormRow,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PlatFormQueryKey.PLATFORM] }),
    onError: error => {
      console.log(error);
      router.push(PLATFORM_PATH);
    },
  });

  const editPlatFormCardMutation = useMutation({
    mutationFn: updatePlatFormData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PlatFormQueryKey.PLATFORM] }),
    onError: error => {
      console.log(error);
      router.push(PLATFORM_PATH);
    },
  });

  const removePlatFormCardMutation = useMutation({
    mutationFn: removePlatFormData,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: [PlatFormQueryKey.PLATFORM] }),
    onError: error => {
      console.log('platform 삭제시 오류', error);
      router.push(PLATFORM_PATH);
    },
  });

  return {
    addCardToPlatForm: addPlatFormCardMutation.mutate,
    editCardPlatForm: editPlatFormCardMutation.mutate,
    editPending: editPlatFormCardMutation.isPending,
    addPending: addPlatFormCardMutation.isPending,
    removeCardPlatForm: removePlatFormCardMutation.mutate,
  };
};

export default usePlatFormSetQuery;
