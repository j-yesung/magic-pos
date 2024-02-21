import { MANAGEMENT_PATH } from '@/data/url-list';
import { supabase } from '@/shared/supabase';
import { OrderConfirmType, ToastTypeOption } from '@/types/common';
import { StoreWithOrderInfo } from '@/types/supabase';
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';
import { RefObject } from 'react';

export const fetchManagement = async (id?: string) => {
  if (id) {
    const { data: store, error } = await supabase
      .from('store')
      .select('*, store_table(*),order_store(*),order_number(*)')
      .eq('business_id', id)
      .eq('order_store.is_done', false)
      .eq('order_number.is_done', false);
    if (error) throw new Error(error.message);
    return store;
  }
};

export const updateIsDone = async (orderData: OrderConfirmType) => {
  const { error } = await supabase
    .from(`${orderData.isTogo ? 'order_number' : 'order_store'}`)
    .update({ is_done: true })
    .eq('id', orderData.id)
    .select();
  if (error) throw new Error(error.message);
};

export const submitDetectedOrder = (
  storeId: string,
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<StoreWithOrderInfo[] | undefined, Error>>,
  toast: (content: string, option: Omit<ToastTypeOption, 'id' | 'content' | 'animation'>) => void,
  soundButtonRef: RefObject<HTMLDivElement>,
  synth: SpeechSynthesis,
) => {
  supabase
    .channel('order')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'order_store', filter: `store_id=eq.${storeId}` },
      payload => {
        payloadFunction(payload.new.order_number, toast, refetch, soundButtonRef, synth);
      },
    )
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'order_number', filter: `store_id=eq.${storeId}` },
      payload => {
        payloadFunction(payload.new.order_number, toast, refetch, soundButtonRef, synth);
      },
    )
    .subscribe();
};

// realTime에 payload함수에서 사용하는 함수
const payloadFunction = (
  orderNumber: number,
  toast: (content: string, option: Omit<ToastTypeOption, 'id' | 'content' | 'animation'>) => void,
  refetch: (
    options?: RefetchOptions | undefined,
  ) => Promise<QueryObserverResult<StoreWithOrderInfo[] | undefined, Error>>,
  soundButtonRef: RefObject<HTMLDivElement>,
  synth: SpeechSynthesis,
) => {
  // toast모달창
  toast(`주문번호${orderNumber}번이 요청되었습니다.`, {
    type: 'info',
    position: 'top-right',
    showCloseButton: false,
    autoClose: 5000,
  });

  /**
   * 효과음이 울린다음 TTS알림이 울림
   */
  // 효과음
  soundButtonRef?.current?.click();
  // TTS 음성알림
  const voices = synth.getVoices();
  const text = `주문번호 ${orderNumber}번 주문이 요청되었습니다`;
  const utterThis = new SpeechSynthesisUtterance(text);
  utterThis.voice = voices.filter(voice => {
    return voice.lang.includes('ko');
  })[1];
  utterThis.lang = 'ko-KR';
  utterThis.rate = 1.1;
  synth.speak(utterThis);

  // 주문현황 refetch
  refetch();

  // notification 알림창
  const notification = new Notification(`주문번호${orderNumber}`, {
    icon: '',
    body: `주문번호${orderNumber}번이 요청되었습니다.`,
  });
  notification.onclick = () => {
    window.open(`${process.env.NEXT_PUBLIC_SUPACE_REDIRECT_TO}${MANAGEMENT_PATH}`);
  };
};
