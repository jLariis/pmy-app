import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    vehicle: "Ford F-150",
    licensePlate: "ABC-123",
    maintenanceType: "Cambio de aceite",
    scheduledDate: "2023-06-15T10:00:00",
    status: "Pendiente",
  },
  {
    id: "2",
    vehicle: "Chevrolet Silverado",
    licensePlate: "XYZ-789",
    maintenanceType: "Revisión de frenos",
    scheduledDate: "2023-06-16T14:00:00",
    status: "En progreso",
  },
  // Añade más mantenimientos programados aquí...
]

export default function MaintenanceSchedulePage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Programación de Mantenimiento"
        description="Gestión de mantenimientos programados para vehículos"
      />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

