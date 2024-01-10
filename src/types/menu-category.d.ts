declare type CategoryType = {
  id: string;
  store_id: string;
  name: string;
  position: number;
};

declare type CategoryWithItemType = CategoryType & {
  menu_item: MenuItemType[];
};

declare type MenuItemType = {
  id: string;
  category_id: string;
  image_url: string;
  name: string;
  price: number;
  remain_ea: number;
};
