import AdminLayout from "@/components/layout/admin/AdminLayout";
import Table from "@/components/table/Table";
import { ReactNode } from "react";


const TablePage = () => <Table />

TablePage.getLayout = (page: ReactNode) => {
  return <AdminLayout>{page}</AdminLayout>;
};
export default TablePage