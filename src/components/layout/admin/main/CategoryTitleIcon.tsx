import { useRouter } from 'next/router';
import { AiOutlineShop } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrMoney } from 'react-icons/gr';
import { ImSpoonKnife } from 'react-icons/im';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdOutlineTableBar, MdOutlineWebAsset } from 'react-icons/md';

const ICONS: Record<string, JSX.Element> = {
  '/admin/order-check-list': <IoDocumentOutline size={'2.8rem'} />,
  '/admin/sales': <GrMoney size={'2.8rem'} />,
  '/admin/platform': <MdOutlineWebAsset size={'2.8rem'} />,
  '/admin/table': <MdOutlineTableBar size={'2.8rem'} />,
  '/admin/menu-category': <BiCategory size={'2.8rem'} />,
  '/admin/menu-item': <ImSpoonKnife size={'2.8rem'} />,
  '/admin/store': <AiOutlineShop size={'2.8rem'} />,
};

const CategoryTitleIcon = () => {
  const path = useRouter().pathname;
  const icon = ICONS[path];

  return <>{icon}</>;
};

export default CategoryTitleIcon;
