import { PageHeader } from "@/components/PageHeader"
import { UsersClient } from "./users-client"

export const metadata = {
  title: "Usuarios | Del Yaqui",
}

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Usuarios" description="Gestión de usuarios, roles y permisos del sistema." />
      <UsersClient />
    </div>
  )
}

