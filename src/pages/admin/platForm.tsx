import AdminLayout from "@/components/layout/admin/AdminLayout"
import PlatForm from "@/components/platform/PlatForm"
import { ReactNode } from "react"

const PlatFormPage = () => <PlatForm/>
PlatFormPage.getLayout = (page:ReactNode)=><AdminLayout>{page}</AdminLayout>

export default PlatFormPage
