import AdminLayout from '@/components/layout/admin/AdminLayout';
import Management from '@/components/management/Management';
import { ReactNode } from 'react';

const ManagementPage = () => <Management />

ManagementPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;


export default ManagementPage;
