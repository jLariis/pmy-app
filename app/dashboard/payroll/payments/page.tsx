import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    employeeName: "Juan Pérez",
    paymentDate: "2023-05-31",
    grossAmount: 15000,
    deductions: 3000,
    netAmount: 12000,
  },
  {
    id: "2",
    employeeName: "María González",
    paymentDate: "2023-05-31",
    grossAmount: 25000,
    deductions: 5000,
    netAmount: 20000,
  },
  // Add more payment data as needed
]

export default function PaymentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Pagos de Nómina" description="Registro y gestión de pagos de nómina a empleados" />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
