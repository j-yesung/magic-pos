import AdminLayout from '@/components/layout/admin/AdminLayout';
import Status from '@/components/sales/status/Status';
import { ReactNode } from 'react';
const StatusPage = () => <Status />;

StatusPage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default StatusPage;
