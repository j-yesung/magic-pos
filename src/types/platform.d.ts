export interface AddFormType {
  file?: File | null;
  image_url?: string;
  name: string;
  store_id: string;
  createdAt?: string;
  link_url: string;
  id?: string | null;
}

export interface EditFormType {
  id: string;
  name: string;
  link_url: string;
  store_id: string | null;
  image_url?: string | null;
  file?: File | null;
  createdAt?: string;
}
