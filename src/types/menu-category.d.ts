declare type CategoryType = {
  id: string;
  store_id: string;
  name: string;
  position: number;
};

declare interface AdminCategories {
  adminCategories: {
    id: number;
    name: string;
    url: string;
    active: boolean;
  }[];
}
