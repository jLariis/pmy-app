import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"

const data = [
  {
    id: "INV-001",
    client: "Empresa A",
    amount: 5000,
    status: "paid",
    date: "2023-05-01",
  },
  {
    id: "INV-002",
    client: "Empresa B",
    amount: 7500,
    status: "pending",
    date: "2023-05-15",
  },
  // Add more invoice data as needed
]

export default function InvoicesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Facturas" description="Gestión de facturas de clientes" />
        <Button className="bg-brand-brown hover:bg-brand-brown/90">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Factura
        </Button>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
