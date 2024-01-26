import { useRouter } from 'next/router';
import { AiOutlineShop } from 'react-icons/ai';
import { BiCategory } from 'react-icons/bi';
import { GrMoney } from 'react-icons/gr';
import { ImSpoonKnife } from 'react-icons/im';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdOutlineTableBar, MdOutlineWebAsset } from 'react-icons/md';

const ICONS: Record<string, JSX.Element> = {
  '/admin/order-check-list': <IoDocumentOutline size={28} />,
  '/admin/sales': <GrMoney size={28} />,
  '/admin/platform': <MdOutlineWebAsset size={28} />,
  '/admin/table': <MdOutlineTableBar size={28} />,
  '/admin/menu-category': <BiCategory size={28} />,
  '/admin/menu-item': <ImSpoonKnife size={28} />,
  '/admin/store': <AiOutlineShop size={28} />,
};

const CategoryTitleIcon = () => {
  const path = useRouter().pathname;
  const icon = ICONS[path];

  return <>{icon}</>;
};

export default CategoryTitleIcon;
