import { PageHeader } from "@/components/PageHeader"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

const data = [
  {
    id: "1",
    vehicle: "Ford F-150",
    licensePlate: "ABC-123",
    maintenanceType: "Cambio de aceite",
    completionDate: "2023-05-15T10:00:00",
    cost: 150.0,
    technician: "Juan Mecánico",
  },
  {
    id: "2",
    vehicle: "Chevrolet Silverado",
    licensePlate: "XYZ-789",
    maintenanceType: "Revisión de frenos",
    completionDate: "2023-05-16T14:00:00",
    cost: 200.0,
    technician: "María Técnica",
  },
  // Añade más historiales de mantenimiento aquí...
]

export default function MaintenanceHistoryPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Historial de Mantenimiento"
        description="Registro de mantenimientos realizados a los vehículos"
      />
      <DataTable columns={columns} data={data} />
    </div>
  )
}

