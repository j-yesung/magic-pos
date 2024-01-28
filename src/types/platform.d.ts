export interface AddPlatFormType {
  file?: File | null;
  image_url?: string;
  name: string;
  store_id: string;
  createdAt?: string;
  link_url: string;
  id?: string | null;
  metaImage: string | null;
}

export interface EditPlatFormType {
  id: string;
  name: string;
  link_url: string;
  store_id: string | null;
  image_url?: string | null;
  file?: File | null;
  createdAt?: string;
  metaImage?: string | null;
}
