import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    name: "Juan Pérez",
    position: "Conductor",
    department: "Operaciones",
    salary: 15000,
    hireDate: "2022-01-15",
  },
  {
    id: "2",
    name: "María González",
    position: "Gerente de Logística",
    department: "Logística",
    salary: 25000,
    hireDate: "2021-05-20",
  },
  // Add more employee data as needed
]

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Empleados" description="Gestión de información de empleados" />
      <DataTable columns={columns} data={data} />
    </div>
  )
}
