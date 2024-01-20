import { useRouter } from 'next/router';
import { IoBrowsersOutline, IoCellularSharp, IoDocumentOutline, IoGrid } from 'react-icons/io5';

const ICONS: Record<string, JSX.Element> = {
  '/admin/order-check-list': <IoDocumentOutline size={50} />,
  '/admin/sales': <IoCellularSharp size={50} />,
  '/admin/platform': <IoBrowsersOutline size={50} />,
  '/admin/table': <IoGrid size={50} />,
};

const CategoryTitleIcon = () => {
  const path = useRouter().pathname;
  const icon = ICONS[path];

  return <>{icon}</>;
};

export default CategoryTitleIcon;
