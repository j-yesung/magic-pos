import AdminLayout from '@/components/layout/admin/AdminLayout';
import Sales from '@/components/sales/Sales';
import { ReactNode } from 'react';

const SalesPage = () => <Sales />;
SalesPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;
export default SalesPage;
