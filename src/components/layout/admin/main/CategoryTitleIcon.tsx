import { useRouter } from 'next/router';
import {
  IoBrowsersOutline,
  IoCellularSharp,
  IoDocumentOutline,
  IoGrid,
  IoListSharp,
  IoRestaurant,
  IoStorefront,
} from 'react-icons/io5';

const ICONS: Record<string, JSX.Element> = {
  '/admin/order-check-list': <IoDocumentOutline size={28} />,
  '/admin/sales': <IoCellularSharp size={28} />,
  '/admin/platform': <IoBrowsersOutline size={28} />,
  '/admin/table': <IoGrid size={28} />,
  '/admin/menu-category': <IoListSharp size={28} />,
  '/admin/menu-item': <IoRestaurant size={28} />,
  '/admin/store': <IoStorefront size={28} />,
};

const CategoryTitleIcon = () => {
  const path = useRouter().pathname;
  const icon = ICONS[path];

  return <>{icon}</>;
};

export default CategoryTitleIcon;
