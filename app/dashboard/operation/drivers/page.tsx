import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { NewDriverDialog } from "@/components/NewDriverDialog"

const data = [
  {
    id: "1",
    name: "Juan Pérez",
    licenseNumber: "ABC123456",
    phoneNumber: "6441234567",
    status: "active",
  },
  {
    id: "2",
    name: "María González",
    licenseNumber: "XYZ789012",
    phoneNumber: "6449876543",
    status: "inactive",
  },
  // Add more sample data as needed
]

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Repartidores" description="Gestión de repartidores" />
        <NewDriverDialog>
          <Button className="bg-brand-brown hover:bg-brand-brown/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Repartidor
          </Button>
        </NewDriverDialog>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}