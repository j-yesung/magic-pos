import { Tables } from '@/types/supabase';
import { create } from 'zustand';
import useAuthState from './session';

interface PlatformStore {
  isRegis: boolean;
  addPlatform: {
    file?: File | null;
    image_url?: string;
    name: string;
    store_id: string;
    createdAt?: string;
    link_url: string;
    id?: string | null;
  };
  editPlatForm: {
    id: string;
    name: string;
    link_url: string;
    store_id: string | null;
    image_url?: string | null;
    file?: File | null;
    createdAt?: string;
  };
  isEdit: boolean;
  fetchPlatForm: Tables<'platform'>[];
}

const usePlatformStore = create<PlatformStore>()(() => ({
  isRegis: false,
  isEdit: false,
  addPlatform: {
    name: '',
    link_url: '',
    store_id: useAuthState(state => state.storeId)!,
  },
  editPlatForm: {
    id: '',
    name: '',
    link_url: '',
    store_id: useAuthState(state => state.storeId)!,
    image_url: null,
    file: null,
  },
  fetchPlatForm: [],
}));

export default usePlatformStore;
