import AdminLayout from "@/components/layout/admin/AdminLayout";
import OrderCheckList from "@/components/order-check-list/OrderCheckList";
import { ReactNode } from "react";

const OrderCheckListPage = () => <OrderCheckList />

OrderCheckListPage.getLayout = (page: ReactNode) => <AdminLayout>{page}</AdminLayout>;

export default OrderCheckListPage