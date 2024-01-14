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

declare type CategoryWithItemType = CategoryType & {
  menu_item: MenuItemType[];
};

declare type MenuItemType = {
  id: string;
  category_id: string;
  image_url: string | null;
  name: string | null;
  price: number | null;
  remain_ea: number | null;
  recommended: boolean;
  position: number;
};
