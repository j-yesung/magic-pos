import {
  MENU_CATEGORY_PATH,
  MENU_ITEM_PATH,
  ORDER_CHECK_LIST_PATH,
  PLATFORM_PATH,
  SALES_PATH,
  STORE_PATH,
  TABLE_PATH,
} from '@/data/url-list';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineShop } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrMoney } from 'react-icons/gr';
import { ImSpoonKnife } from 'react-icons/im';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdOutlineTableBar, MdOutlineWebAsset } from 'react-icons/md';

const ICONS: Record<string, JSX.Element> = {
  [ORDER_CHECK_LIST_PATH]: <IoDocumentOutline size={'2.8rem'} />,
  [SALES_PATH]: <GrMoney size={'2.8rem'} />,
  [PLATFORM_PATH]: <MdOutlineWebAsset size={'2.8rem'} />,
  [TABLE_PATH]: <MdOutlineTableBar size={'2.8rem'} />,
  [MENU_CATEGORY_PATH]: <BiCategory size={'2.8rem'} />,
  [MENU_ITEM_PATH]: <ImSpoonKnife size={'2.8rem'} />,
  [STORE_PATH]: <AiOutlineShop size={'2.8rem'} />,
};

const CategoryTitleIcon = () => {
  const path = useRouter().pathname;
  const icon = ICONS[path];

  return <>{icon}</>;
};

export default React.memo(CategoryTitleIcon);
